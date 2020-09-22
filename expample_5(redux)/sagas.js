import {
  all,
  put,
  takeEvery,
  takeLatest,
  select,
  race,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import get from 'lodash/get';
import { t } from 'i18next';
import {
  FETCH_COMPANIES,
  setCompanies,
  PATCH_COMPANY,
  replaceCompany,
  DELETE_COMPANY,
  removeCompany,
  UPLOAD_COMPANY_PICTURE,
  updateCompany,
  RESET_COMPANY_RELATED_DATA,
  RESEND_DAILY_EMAIL,
} from '../actions/companies';
import { setRequestLoading, setRequestResolved } from '../actions/requestStatuses';
import { privateAPI, publicAPI } from '../api/axiosInstances';
import {
  COMPANIES_URL,
  COMPANY_URL,
  COMPANY_PICTURE_URL,
  COMPANY_PICTURE_ID,
  RESEND,
} from '../api/constants';
import companyIdSelector from '../selectors/company/companyIdSelector';
import { addErrorMessage, addSuccessMessage } from '../actions/globalNotification';
import { closeDeleteCompanyConfirmation } from '../actions/popups';
import history from '../utils/history';
import * as routes from '../constants/routes';
import config from '../config';
import getErrorMessage from './helpers/getErrorMessage';
import createCompanyPictureUrlFromIdentifier from '../utils/fileUrls/createCompanyPictureUrlFromIdentifier';
import { fetchFinancialSources } from './financialSources';

export function* fetchCompanies() {
  try {
    const hasCompanies = yield select(state => get(state, 'companies.companies', []).length > 0);

    // load silently if some companies exist in state
    if (!hasCompanies) {
      yield put(setRequestLoading('fetch_companies'));
    }

    const response = yield privateAPI.get(COMPANIES_URL);
    const companies = get(response, 'data.data', []);

    yield put(setCompanies(companies));
  } catch (e) {
    // continue regardless of error
  } finally {
    yield put(setRequestResolved('fetch_companies'));
  }
}

function* patchCompany({ values }) {
  try {
    yield put(setRequestLoading('patch_company'));

    const selectedCompanyId = yield select(companyIdSelector);
    const {
      companyName,
      country,
      crn,
      displayCurrencyCode,
      sicCodes,
      usedBy,
    } = values;

    const validSicCodes = sicCodes
      .filter(Boolean)
      .map(sicCode => get(sicCode, 'selectedSuggestion.item[0]'));

    const response = yield privateAPI.patch(COMPANY_URL(selectedCompanyId), {
      name: companyName,
      crn,
      displayCurrencyCode,
      usedBy,
      sicCodes: validSicCodes.length > 0 ? validSicCodes : undefined,

      countryCode: country,
    });

    const company = get(response, 'data.data');
    yield put(replaceCompany(company));
    yield put(addSuccessMessage(t('companySettings.generalTab.companyUpdateSuccess')));
  } catch (error) {
    const errorMessage = get(error, 'response.data.errors[0].message', t('companySettings.generalTab.companyUpdateError'));

    yield put(addErrorMessage(errorMessage));
  }

  yield put(setRequestResolved('patch_company'));
}

function* deleteCompany({ companyId }) {
  const statusFlag = 'delete_company';
  try {
    yield put(setRequestLoading(statusFlag));
    yield privateAPI.delete(COMPANY_URL(companyId));

    yield put(addSuccessMessage(t('companySettings.generalTab.companyDeleteSuccess')));
    yield put(removeCompany(companyId));
    yield put(closeDeleteCompanyConfirmation());
    history.push(routes.DASHBOARD);
  } catch (error) {
    const errorMessage = get(error, 'response.data.errors[0].message', t('companySettings.generalTab.companyDeleteError'));

    yield put(addErrorMessage(errorMessage));
  }
  yield put(setRequestResolved(statusFlag));
}

function* updatePictureId(companyId, pictureId) {
  yield privateAPI.patch(COMPANY_PICTURE_ID(companyId), { pictureId });
}

function* fetchPictureTillSuccess(identifier) {
  let success = false;

  while (!success) {
    try {
      yield publicAPI.get(createCompanyPictureUrlFromIdentifier(identifier, 'large'));
      success = true;
    } catch (error) {
      yield delay(250);
    }
  }
}

function* testFetchingUploadedCompanyPicture(identifier, timeout = 5000) {
  yield race({
    task: fetchPictureTillSuccess(identifier),
    cancel: delay(timeout),
  });
}

function* uploadCompanyPicture({ companyId, picture }) {
  const flag = 'company_picture_upload';
  try {
    if (!picture) {
      return;
    }

    yield put(setRequestLoading(flag));
    const contentType = picture.type;

    const uploadUrlResponse = yield privateAPI.get(COMPANY_PICTURE_URL, {
      params: {
        contentType,
      },
    });

    const uploadUrl = get(uploadUrlResponse, 'data.data.item.uploadUrl');
    const pictureId = get(uploadUrlResponse, 'data.data.item.pictureId');

    yield publicAPI.put(uploadUrl, picture, {
      headers: {
        'Content-Type': contentType,
      },
    });

    const identifier = `${config.PICTURE_IDENTIFIER}|${pictureId}`;

    yield* updatePictureId(companyId, pictureId);
    yield* testFetchingUploadedCompanyPicture(identifier);
    yield put(updateCompany(companyId, { item: { picture: identifier } }));
    yield put(addSuccessMessage(t('notifications.userUpdateSuccess')));
  } catch (error) {
    yield put(addErrorMessage(getErrorMessage(error, t('notifications.userUpdateFailed'))));
  }

  yield put(setRequestResolved(flag));
}

function* setCompanyRelatedData() {
  const flag = 'fetch_company_related_data';
  const companyId = yield select(companyIdSelector);
  // correct, effects will get executed in parallel
  yield put(setRequestLoading(flag));
  yield all([
    fetchFinancialSources({ companyId }),
  ]);

  yield put(setRequestResolved(flag));
}

function* resendDailyEmail({ companyId }) {
  const statusFlag = 'resend_daily_email';
  try {
    yield put(setRequestLoading(statusFlag));
    yield privateAPI.post(RESEND, { companyId, force: true }, { params: { kind: 'daily' } });

    yield put(addSuccessMessage(t('companySettings.resendSuccesful')));
    history.push(routes.DASHBOARD);
  } catch (error) {
    const errorMessage = get(error, 'response.data.errors[0].message', t('companySettings.resendError'));

    yield put(addErrorMessage(errorMessage));
  }
  yield put(setRequestResolved(statusFlag));
}

export default function* () {
  yield all([
    takeEvery(FETCH_COMPANIES, fetchCompanies),
    takeEvery(RESEND_DAILY_EMAIL, resendDailyEmail),
    takeLatest(PATCH_COMPANY, patchCompany),
    takeLatest(DELETE_COMPANY, deleteCompany),
    takeLatest(UPLOAD_COMPANY_PICTURE, uploadCompanyPicture),
    takeLatest(RESET_COMPANY_RELATED_DATA, setCompanyRelatedData),
  ]);
}

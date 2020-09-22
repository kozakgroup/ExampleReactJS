import history from '../utils/history';
import { HOME } from '../constants/routes';

export const SET_SELECTED_COMPANY = 'SET_SELECTED_COMPANY';
export const SET_COMPANIES = 'SET_COMPANIES';
export const FETCH_COMPANIES = 'FETCH_COMPANIES';
export const PATCH_COMPANY = 'PATCH_COMPANY';
export const REPLACE_COMPANY = 'REPLACE_COMPANY';
export const DELETE_COMPANY = 'DELETE_COMPANY';
export const REMOVE_COMPANY = 'REMOVE_COMPANY';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const UPLOAD_COMPANY_PICTURE = 'UPLOAD_COMPANY_PICTURE';
export const RESET_COMPANY_RELATED_DATA = 'RESET_COMPANY_RELATED_DATA';
export const ADD_COMPANY = 'ADD_COMPANY';
export const RESEND_DAILY_EMAIL = 'RESEND_DAILY_EMAIL';

export const setCompanies = companies => ({
  type: SET_COMPANIES,
  companies,
});

export const setSelectedCompany = (companyId) => {
  history.push(HOME);

  return {
    type: SET_SELECTED_COMPANY,
    companyId,
  };
};

export const fetchCompanies = companyId => ({ type: FETCH_COMPANIES, companyId });

export const patchCompany = values => ({
  type: PATCH_COMPANY,
  values,
});

export const replaceCompany = company => ({
  type: REPLACE_COMPANY,
  company,
});

export const deleteCompany = companyId => ({
  type: DELETE_COMPANY,
  companyId,
});

export const removeCompany = companyId => ({
  type: REMOVE_COMPANY,
  companyId,
});

export const updateCompany = (companyId, company) => ({
  type: UPDATE_COMPANY,
  companyId,
  company,
});

export const uploadCompanyPicture = (companyId, files) => {
  const picture = files && files.length > 0 && files[0];

  return {
    type: UPLOAD_COMPANY_PICTURE,
    companyId,
    picture,
  };
};

export const resetCompanyRelatedData = () => ({
  type: RESET_COMPANY_RELATED_DATA,
});

export const addCompany = company => ({
  type: ADD_COMPANY,
  company,
});

export const resendDailyEmail = companyId => ({
  type: RESEND_DAILY_EMAIL,
  companyId,
});

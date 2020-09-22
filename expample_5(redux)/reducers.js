import get from 'lodash/get';
import merge from 'lodash/merge';
import { setIn } from '../utils/immutablity';
import {
  SET_COMPANIES,
  SET_SELECTED_COMPANY,
  REPLACE_COMPANY,
  UPDATE_COMPANY,
  REMOVE_COMPANY,
  ADD_COMPANY,
} from '../actions/companies';
import { SET_USER_STATE } from '../actions/common';
import selectedCompanySelector from '../selectors/company/selectedCompanySelector';

export const initialState = {
  companies: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_STATE:
      return get(action, 'userState.companies') || state;

    case SET_COMPANIES:
    {
      const newState = setIn(state, 'companies', action.companies);
      const selectedCompany = selectedCompanySelector({ companies: newState });

      return setIn(newState, 'selectedCompanyId', get(selectedCompany, 'item.id'));
    }

    case ADD_COMPANY:
      return {
        ...state,
        companies: [
          ...state.companies,
          action.company,
        ],
        selectedCompanyId: get(action.company, 'item.id'),
      };

    case SET_SELECTED_COMPANY:
      return setIn(state, 'selectedCompanyId', action.companyId);

    case REPLACE_COMPANY:
      return setIn(
        state,
        'companies',
        state.companies.map(company => (
          get(company, 'item.id') === get(action.company, 'item.id') ? action.company : company
        )),
      );

    case UPDATE_COMPANY:
      return setIn(
        state,
        'companies',
        state.companies.map(company => (
          get(company, 'item.id') === action.companyId
            ? merge({}, company, action.company)
            : company
        )),
      );

    case REMOVE_COMPANY:
    {
      const companies = state.companies
        .filter(company => get(company, 'item.id') !== action.companyId);
      const selectedCompanyId = get(companies, '[0].item.id');

      return {
        ...state,
        companies,
        selectedCompanyId,
      };
    }

    default:
      return state;
  }
};

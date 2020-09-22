import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import FileUploader from '../common/FileUploader';
import { prepareCsv } from '../../actions/importCsv';
import isRequestLoading from '../../utils/isRequestLoading';
import FinancialSourceInfo from './TablesPage/FinancialSourceInfo';

const FinancialSourceInfoGrid = styled(Grid)`
  && {
    width: 100%;
    max-width: 590px;
  }
`;

const FileUploaderGrid = styled(Grid)`
  && {
    width: 100%;
    max-width: 200px;
  }
`;

class FileImport extends Component {
  handleCsvUpload = (event) => {
    try {
      this.props.onUpload(event.target.files[0]);
    } catch (error) {}
  };

  render() {
    const { loading } = this.props;

    return (
      <Grid container direction="column" spacing={32} alignItems="center">
        <FinancialSourceInfoGrid item>
          <FinancialSourceInfo />
        </FinancialSourceInfoGrid>
        <FileUploaderGrid item>
          <FileUploader
            onChange={this.handleCsvUpload}
            loading={loading}
            inputProps={{
              accept: '.csv',
            }}
          />
        </FileUploaderGrid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  loading: isRequestLoading(state, 'csv_import') || isRequestLoading(state, 'csv_parse'),
});

const mapDispatchToProps = {
  onUpload: prepareCsv,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileImport);

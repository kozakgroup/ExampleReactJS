import React, { Component } from 'react';
import get from 'lodash/get';
import { t } from 'i18next';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import Typography from '@material-ui/core/Typography';
import { fetchNetworths } from '../../actions/networth';
import graphsSelector from '../../selectors/networth/graphsSelector';
import Card from '../common/Card';
import AccountHeader from './AccountHeader';
import consolidatedGraphSelector from '../../selectors/networth/consolidatedGraphSelector';
import isRequestLoading from '../../utils/isRequestLoading';
import CollapsableSection from '../common/CollapsableSection';
import SectionWithLoader from '../common/SectionWithLoader';
import { GraphContainer, ChartWrapper, Divider } from './common';
import { formatCurrency } from '../../utils/formatting/formatCurrency';
import CustomTooltip from './Tooltip';

class NetworthGraphs extends Component {
  componentDidMount = () => {
    this.props.onMount();
  }

  renderGraph = graph => (
    <ChartWrapper>
      <ResponsiveContainer height={300} width="100%">
        <LineChart
          data={graph}
          margin={{
            top: 5, right: 10, bottom: 5,
          }}
          style={{ fontSize: 14 }}
        >
          <XAxis dataKey="xAxisLabel" />
          <YAxis allowDecimals={false} tickFormatter={formatCurrency} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line name="Networth" dataKey="netWorthConverted" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );

  renderNetworthForAccount = (networth, index) => {
    const financialSourceId = get(networth, 'item.financialSourceId');
    const graph = this.props.graphs[index];

    return (
      <GraphContainer item>
        <Card key={financialSourceId}>
          <AccountHeader id={financialSourceId} />
          {this.renderGraph(graph)}
        </Card>
      </GraphContainer>
    );
  };

  renderConsolidatedGraph = () => {
    const { consolidatedGraph } = this.props;

    if (!consolidatedGraph) return null;

    return (
      <GraphContainer item>
        <Card>
          <Typography color="primary">{t('dashboard.consolidated')}</Typography>
          <Divider />
          {this.renderGraph(consolidatedGraph)}
        </Card>
      </GraphContainer>
    );
  }

  render() {
    const { networth, loading } = this.props;

    return (
      <CollapsableSection openDefault title={t('dashboard.networthPerBankAccount')}>
        <SectionWithLoader loading={loading}>
          <Grid container spacing={32} justify="center">
            {
              networth.map(this.renderNetworthForAccount)
            }
            { this.renderConsolidatedGraph() }
          </Grid>
        </SectionWithLoader>
      </CollapsableSection>
    );
  }
}

const mapStateToProps = state => ({
  graphs: graphsSelector(state),
  consolidatedGraph: consolidatedGraphSelector(state),
  networth: get(state, 'networth.netWorth', []),
  loading: isRequestLoading(state, 'fetch_networths') || isRequestLoading(state, 'fetch_financial_sources'),
});

const mapDispatchToProps = dispatch => ({
  onMount: () => dispatch(fetchNetworths()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworthGraphs);

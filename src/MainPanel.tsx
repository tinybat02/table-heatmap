import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions, FieldBuffer, DayObj } from 'types';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { processData } from './utils/helperFunc';

interface Props extends PanelProps<PanelOptions> {}
interface State {
  data: Array<DayObj> | null;
  keys: string[] | null;
}

export class MainPanel extends PureComponent<Props, State> {
  state: State = {
    data: null,
    keys: null,
  };

  componentDidMount() {
    const fields = this.props.data.series[0].fields as FieldBuffer[];
    const { data, keys } = processData(this.props.data.series[0].length, fields);
    this.setState({ data, keys });
  }

  render() {
    const { width, height } = this.props;
    const { data, keys } = this.state;

    if (!data || !keys) {
      return <div />;
    }

    return (
      <div
        style={{
          position: 'relative',
          width,
          height,
        }}
      >
        <ResponsiveHeatMap
          data={data}
          keys={keys}
          indexBy="date"
          margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
          forceSquare={true}
          axisTop={null}
          axisRight={null}
          axisBottom={{ orient: 'bottom', tickSize: 5, tickPadding: 5, tickRotation: -90, legend: '', legendOffset: 36 }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            //legend: 'date',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          cellOpacity={1}
          cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.8]] }}
          colors="nivo"
          // @ts-ignore
          defs={[
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(0, 0, 0, 0.1)',
              rotation: -45,
              lineWidth: 4,
              spacing: 7,
            },
          ]}
          fill={[{ id: 'lines' }]}
          animate={true}
          motionStiffness={80}
          motionDamping={9}
          // hoverTarget="cell"
          cellHoverOthersOpacity={0.25}
        />
      </div>
    );
  }
}

/* const data1 = [
  {
    date: '20-04-2020',
    '2 PM': 71,
    '3 PM': 19,
    '4 PM': 10,
    '5 PM': 75,
  },
  {
    date: '21-04-2020',
    '2 PM': 28,
    '3 PM': 24,
    '4 PM': 5,
    '5 PM': 19,
  },
  {
    date: '22-04-2020',
    '2 PM': 59,
    '3 PM': 76,
    '4 PM': 66,
    '5 PM': 48,
  },
];
 */

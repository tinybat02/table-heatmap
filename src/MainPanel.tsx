import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions, FieldBuffer, DayObj } from 'types';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { processData } from './utils/helperFunc';
import { hours } from './config/constant';

interface Props extends PanelProps<PanelOptions> {}
interface State {
  data: Array<DayObj> | null;
}

export class MainPanel extends PureComponent<Props, State> {
  state: State = {
    data: null,
  };

  componentDidMount() {
    const fields = this.props.data.series[0].fields as FieldBuffer[];
    const { data } = processData(this.props.data.series[0].length, fields);
    this.setState({ data });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data.series[0] !== this.props.data.series[0]) {
      const newFields = this.props.data.series[0].fields as FieldBuffer[];

      const { data } = processData(this.props.data.series[0].length, newFields);
      this.setState({ data });
    }
  }

  render() {
    const { width, height } = this.props;
    const { data } = this.state;

    if (!data) {
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
          keys={hours}
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

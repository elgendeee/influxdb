// Libraries
import React, {PureComponent} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {withRouter, WithRouterProps} from 'react-router'
import {AutoSizer} from 'react-virtualized'

// Components
import Gauge from 'src/shared/components/Gauge'

// Types
import {GaugeViewProperties} from 'src/types/dashboards'

// Utils
import {isLightMode} from 'src/dashboards/utils/dashboardLightMode'

// Constants
import {
  GAUGE_THEME_LIGHT,
  GAUGE_THEME_DARK,
} from 'src/shared/constants/gaugeSpecs'

// Types
import {AppState} from 'src/types'

import {ErrorHandling} from 'src/shared/decorators/errors'

interface StateProps {
  dashboardLightMode: boolean
}

interface ComponentProps {
  value: number
  properties: GaugeViewProperties
}

type Props = ComponentProps & StateProps & WithRouterProps

@ErrorHandling
class GaugeChart extends PureComponent<Props> {
  public render() {
    const {value, dashboardLightMode, location} = this.props
    const {
      colors,
      prefix,
      tickPrefix,
      suffix,
      tickSuffix,
      decimalPlaces,
    } = this.props.properties

    const lightMode = isLightMode(
      dashboardLightMode,
      location.pathname,
      location.search
    )
    const theme = lightMode ? GAUGE_THEME_LIGHT : GAUGE_THEME_DARK

    console.log('gaugechart', theme)

    return (
      <AutoSizer>
        {({width, height}) => (
          <div className="gauge">
            <Gauge
              width={width}
              height={height}
              colors={colors}
              prefix={prefix}
              tickPrefix={tickPrefix}
              suffix={suffix}
              tickSuffix={tickSuffix}
              gaugePosition={value}
              decimalPlaces={decimalPlaces}
              theme={theme}
            />
          </div>
        )}
      </AutoSizer>
    )
  }
}

const mstp = (state: AppState): StateProps => {
  const {
    app: {
      persisted: {dashboardLightMode},
    },
  } = state

  return {dashboardLightMode}
}

export default connect<StateProps, {}>(
  mstp,
  null
)(withRouter(GaugeChart))

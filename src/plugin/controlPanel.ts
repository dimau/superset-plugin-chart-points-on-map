import {FeatureFlag, isFeatureEnabled, t, validateNonEmpty} from '@superset-ui/core';
import {
  columnChoices,
  ControlPanelConfig,
  ControlPanelState,
  sharedControls
} from '@superset-ui/chart-controls';

const allColumns = {
  type: 'SelectControl',
  default: null,
  mapStateToProps: (state: ControlPanelState) => ({
    choices: columnChoices(state.datasource),
  }),
};

const columnsConfig = isFeatureEnabled(FeatureFlag.ENABLE_EXPLORE_DRAG_AND_DROP)
    ? sharedControls.entity
    : allColumns;

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'Longitude',
            config: {
              ...columnsConfig,
              label: t('Longitude'),
              description: t('Column containing longitude data'),
              validators: [validateNonEmpty],
            },
          },
        ],

        [
          {
            name: 'Latitude',
            config: {
              ...columnsConfig,
              label: t('Latitude'),
              description: t('Column containing latitude data'),
              validators: [validateNonEmpty],
            },
          },
        ],

        ['adhoc_filters'],

        [
          {
            name: 'row_limit',
            config: {
              ...sharedControls.row_limit,
              default: 500,
            },
          },
        ],

      ],
    },
    {
      label: t('Hello Controls!'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'header_text',
            config: {
              type: 'TextControl',
              default: 'Hello, World!',
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Header Text'),
              description: t('The text you want to see in the header'),
            },
          },
        ],

        [
          {
            name: 'bold_text',
            config: {
              type: 'CheckboxControl',
              label: t('Bold Text'),
              renderTrigger: true,
              default: true,
              description: t('A checkbox to make the '),
            },
          },
        ],

        [
          {
            name: 'header_font_size',
            config: {
              type: 'SelectControl',
              label: t('Font Size'),
              default: 'xl',
              choices: [
                // [value, label]
                ['xxs', 'xx-small'],
                ['xs', 'x-small'],
                ['s', 'small'],
                ['m', 'medium'],
                ['l', 'large'],
                ['xl', 'x-large'],
                ['xxl', 'xx-large'],
              ],
              renderTrigger: true,
              description: t('The size of your header font'),
            },
          },
        ],
      ],
    },
  ],
};

export default config;

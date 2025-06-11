const GRAPH_POSITION_LIST = [
  'left',
  'right',
  'top',
  'bottom',
  'inside',
  'insideTop',
  'insideLeft',
  'insideRight',
  'insideBottom',
  'insideTopLeft',
  'insideTopRight',
  'insideBottomLeft',
  'insideBottomRight',
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GRAPH_APP: any = {
  configParameters: {
    rotate: {
      min: -90,
      max: 90,
    },
    align: {
      options: {
        left: 'left',
        center: 'center',
        right: 'right',
      },
    },
    verticalAlign: {
      options: {
        top: 'top',
        middle: 'middle',
        bottom: 'bottom',
      },
    },
    position: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options: GRAPH_POSITION_LIST.reduce(function (map: any, pos: any) {
        map[pos] = pos;
        return map;
      }, {}),
    },
    distance: {
      min: 0,
      max: 100,
    },
  },
  config: {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 20,
  },
};

export const GRAPH_LABEL_OPTION = {
  show: true,
  position: GRAPH_APP.config.position,
  distance: GRAPH_APP.config.distance,
  align: GRAPH_APP.config.align,
  verticalAlign: GRAPH_APP.config.verticalAlign,
  rotate: GRAPH_APP.config.rotate,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {},
  },
};

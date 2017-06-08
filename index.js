'use strict'

const RED = '#F92672'; // pink
const GREEN = '#A6E22E';
const YELLOW = '#FD971F'; // orange
const BLUE = '#AE81FF'; // purple
const MAGENTA = '#AE81FF'; // purple
const CYAN = '#38CCD1';
const WHITE = '#ebebff';
const BLACK = 'rgba(0,0,0,0.15)';

const BRIGHT_RED = RED;
const BRIGHT_GREEN = GREEN;
const BRIGHT_YELLOW = YELLOW;
const BRIGHT_BLUE = BLUE;
const BRIGHT_MAGENTA = MAGENTA;
const BRIGHT_CYAN = CYAN;
const BRIGHT_WHITE = WHITE;
const BRIGHT_BLACK = BLACK;

const DEEP_BLACK = BLACK;

const WINDOW_BACKGROUND_COLOR = 'rgba(25,25,25,0.75)';
const TERMINAL_BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.15)';
const FOREGROUND_COLOR = WHITE;
const BORDER_COLOR = DEEP_BLACK;

const COLORS = {
  red: RED,
  green: GREEN,
  yellow: YELLOW,
  blue: BLUE,
  magenta: MAGENTA,
  cyan: CYAN,
  white: WHITE,
  black: BLACK,

  lightRed: BRIGHT_RED,
  lightGreen: BRIGHT_GREEN,
  lightYellow: BRIGHT_YELLOW,
  lightBlue: BRIGHT_BLUE,
  lightMagenta: BRIGHT_MAGENTA,
  lightCyan: BRIGHT_CYAN,
  lightWhite: BRIGHT_WHITE,
  lightBlack: BRIGHT_BLACK,
};

const TERM_CSS = `
  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${DEEP_BLACK};
  }
`;

const CSS = `
  .hyper_main {
    border: 0 !important;
  }

  .header_header {
    top: 0;
    left: 0;
    right: 0;
  }

  .tabs_borderShim {
    display: none !important;
  }

  .tabs_nav > .tabs_title {
  	width: 100%;
  	height: 100%;
  	background-color: ${TERMINAL_BACKGROUND_COLOR} !important;
  }

  .tabs_list {
    margin-left: 0;
  }

  .tab_tab {
    color: ${FOREGROUND_COLOR} !important;
    border: 0 !important;
    padding-left: 0 !important;
  }

  .tab_active {
    color: ${WHITE};
    height: calc(100% + 1px);
  }

  .tabs_list .tab_active {
    background-color: ${TERMINAL_BACKGROUND_COLOR} !important;
  }

  .tab_first {
    padding-left: 50px !important;
  }

  .tab_text {
    color: ${FOREGROUND_COLOR};
    border: 0 !important;
    opacity: 0.5;
  }

  .tab_active .tab_text {
    opacity: 1;
  }

  .hyper_main {
  	border: none !important;
  }

  .term_active {
    background-color: ${TERMINAL_BACKGROUND_COLOR};
  }
`;

exports.onWindow = browserWindow => browserWindow.setVibrancy('dark');

exports.decorateConfig = (config) => (
  Object.assign({}, config, {
    backgroundColor: WINDOW_BACKGROUND_COLOR,
    foregroundColor: FOREGROUND_COLOR,
    borderColor: BORDER_COLOR,
    cursorColor: FOREGROUND_COLOR,
    colors: COLORS,
    css: `
      ${config.css || ''}
      ${CSS}
    `,
    termCSS: `
      ${config.termCSS || ''}
      ${TERM_CSS}
    `,
  })
);

exports.middleware = () => (next) => (action) => {
  /* eslint-disable no-param-reassign, default-case */
  switch (action.type) {
    case 'CONFIG_LOAD':
    case 'CONFIG_RELOAD':
      action.config.foregroundColor = FOREGROUND_COLOR;
      action.config.backgroundColor = WINDOW_BACKGROUND_COLOR;
      action.config.cursorColor = FOREGROUND_COLOR;
      action.config.borderColor = BORDER_COLOR;
      action.config.colors = COLORS;
      action.config.css = `${action.config.css || ''}${CSS}`;
  }
  next(action);
};

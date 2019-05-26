import { FileResponse } from "figma-js";

const fileResponse: FileResponse = {
  document: {
    id: "0:0",
    name: "Document",
    type: "DOCUMENT",
    children: [
      {
        id: "0:1",
        name: "Page 1",
        type: "CANVAS",
        children: [
          {
            id: "1:2",
            name: "Frame A",
            type: "FRAME",
            blendMode: "PASS_THROUGH",
            children: [
              {
                id: "1:3",
                name: "Text with heading style",
                type: "TEXT",
                blendMode: "PASS_THROUGH",
                absoluteBoundingBox: {
                  x: -240,
                  y: -205,
                  width: 79,
                  height: 41
                },
                constraints: {
                  vertical: "TOP",
                  horizontal: "LEFT"
                },
                fills: [
                  {
                    blendMode: "NORMAL",
                    type: "SOLID",
                    color: {
                      r: 0,
                      g: 0,
                      b: 0,
                      a: 1
                    }
                  }
                ],
                strokes: [],
                strokeWeight: 1,
                strokeAlign: "OUTSIDE",
                effects: [],
                characters: "Heading",
                style: {
                  fontFamily: "Roboto",
                  fontPostScriptName: "Roboto-Bold",
                  fontWeight: 700,
                  fontSize: 21,
                  textAlignHorizontal: "LEFT",
                  textAlignVertical: "TOP",
                  letterSpacing: 0,
                  lineHeightPx: 24.609375,
                  lineHeightPercent: 100,
                  lineHeightUnit: "INTRINSIC_%"
                },
                characterStyleOverrides: [],
                styleOverrideTable: {},
                styles: {
                  text: "1:4"
                }
              },
              {
                id: "10:7",
                name: "Text detached from style",
                type: "TEXT",
                blendMode: "PASS_THROUGH",
                absoluteBoundingBox: {
                  x: -102,
                  y: -209,
                  width: 134,
                  height: 66
                },
                constraints: {
                  vertical: "TOP",
                  horizontal: "LEFT"
                },
                fills: [
                  {
                    blendMode: "NORMAL",
                    type: "SOLID",
                    color: {
                      r: 0,
                      g: 0,
                      b: 0,
                      a: 1
                    }
                  }
                ],
                strokes: [],
                strokeWeight: 1,
                strokeAlign: "OUTSIDE",
                effects: [],
                characters: "Heading detached from style",
                style: {
                  fontFamily: "Roboto",
                  fontPostScriptName: "Roboto-Bold",
                  fontWeight: 700,
                  fontSize: 21,
                  textAlignHorizontal: "LEFT",
                  textAlignVertical: "TOP",
                  letterSpacing: 0,
                  lineHeightPx: 24.609375,
                  lineHeightPercent: 100,
                  lineHeightUnit: "INTRINSIC_%"
                },
                characterStyleOverrides: [],
                styleOverrideTable: {}
              },
              {
                id: "1:6",
                name: "Rect with Dark red fill",
                type: "RECTANGLE",
                blendMode: "PASS_THROUGH",
                absoluteBoundingBox: {
                  x: -243,
                  y: -60,
                  width: 52,
                  height: 63
                },
                constraints: {
                  vertical: "TOP",
                  horizontal: "LEFT"
                },
                fills: [
                  {
                    blendMode: "NORMAL",
                    type: "SOLID",
                    color: {
                      r: 0.3499999940395355,
                      g: 0.16479167342185974,
                      b: 0.16479167342185974,
                      a: 1
                    }
                  }
                ],
                strokes: [],
                strokeWeight: 1,
                strokeAlign: "INSIDE",
                effects: []
              },
              {
                id: "16:1",
                name: "Rect with Red fill",
                type: "RECTANGLE",
                blendMode: "PASS_THROUGH",
                absoluteBoundingBox: {
                  x: -125,
                  y: -60,
                  width: 52,
                  height: 63
                },
                constraints: {
                  vertical: "TOP",
                  horizontal: "LEFT"
                },
                fills: [
                  {
                    blendMode: "NORMAL",
                    type: "SOLID",
                    color: {
                      r: 1,
                      g: 0,
                      b: 0,
                      a: 1
                    }
                  }
                ],
                strokes: [],
                strokeWeight: 1,
                strokeAlign: "INSIDE",
                effects: []
              },
              {
                id: "1:8",
                name: "Rect with Red Style",
                type: "RECTANGLE",
                blendMode: "PASS_THROUGH",
                absoluteBoundingBox: {
                  x: -184,
                  y: -60,
                  width: 52,
                  height: 63
                },
                constraints: {
                  vertical: "TOP",
                  horizontal: "LEFT"
                },
                fills: [
                  {
                    blendMode: "NORMAL",
                    type: "SOLID",
                    color: {
                      r: 1,
                      g: 0,
                      b: 0,
                      a: 1
                    }
                  }
                ],
                strokes: [],
                strokeWeight: 1,
                strokeAlign: "INSIDE",
                styles: {
                  fill: "1:7"
                },
                effects: []
              },
              {
                id: "5:2",
                name: "Default",
                type: "INSTANCE",
                blendMode: "PASS_THROUGH",
                children: [
                  {
                    id: "I5:2;4:2",
                    name: "Rectangle 2",
                    type: "RECTANGLE",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -240,
                      y: 41,
                      width: 112,
                      height: 39
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "SCALE"
                    },
                    fills: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 0,
                          g: 0,
                          b: 0,
                          a: 1
                        }
                      }
                    ],
                    strokes: [],
                    strokeWeight: 1,
                    strokeAlign: "INSIDE",
                    effects: [],
                    cornerRadius: 4,
                    rectangleCornerRadii: [4, 4, 4, 4]
                  },
                  {
                    id: "I5:2;4:3",
                    name: "Default",
                    type: "TEXT",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -207,
                      y: 54,
                      width: 46,
                      height: 16
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "CENTER"
                    },
                    fills: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 1,
                          g: 1,
                          b: 1,
                          a: 1
                        }
                      }
                    ],
                    strokes: [],
                    strokeWeight: 1,
                    strokeAlign: "OUTSIDE",
                    effects: [],
                    characters: "Default",
                    style: {
                      fontFamily: "Roboto",
                      fontPostScriptName: "Roboto-Bold",
                      fontWeight: 700,
                      fontSize: 14,
                      textAlignHorizontal: "CENTER",
                      textAlignVertical: "TOP",
                      letterSpacing: 0,
                      lineHeightPx: 16.40625,
                      lineHeightPercent: 100,
                      lineHeightUnit: "INTRINSIC_%"
                    },
                    characterStyleOverrides: [],
                    styleOverrideTable: {}
                  }
                ],
                absoluteBoundingBox: {
                  x: -240,
                  y: 41,
                  width: 112,
                  height: 39
                },
                constraints: {
                  vertical: "TOP",
                  horizontal: "LEFT"
                },
                clipsContent: false,
                background: [
                  {
                    blendMode: "NORMAL",
                    visible: false,
                    type: "SOLID",
                    color: {
                      r: 1,
                      g: 1,
                      b: 1,
                      a: 1
                    }
                  }
                ],
                backgroundColor: {
                  r: 0,
                  g: 0,
                  b: 0,
                  a: 0
                },
                effects: [],
                componentId: "4:4"
              },
              {
                id: "5:5",
                name: "Secondary",
                type: "INSTANCE",
                blendMode: "PASS_THROUGH",
                children: [
                  {
                    id: "I5:5;14:13",
                    name: "Rectangle 2",
                    type: "RECTANGLE",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -240,
                      y: 101,
                      width: 112,
                      height: 39
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "SCALE"
                    },
                    fills: [],
                    strokes: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 0,
                          g: 0,
                          b: 0,
                          a: 1
                        }
                      }
                    ],
                    strokeWeight: 1,
                    strokeAlign: "INSIDE",
                    effects: [],
                    cornerRadius: 4,
                    rectangleCornerRadii: [4, 4, 4, 4]
                  },
                  {
                    id: "I5:5;14:14",
                    name: "Secondary",
                    type: "TEXT",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -217,
                      y: 114,
                      width: 67,
                      height: 16
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "CENTER"
                    },
                    fills: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 0,
                          g: 0,
                          b: 0,
                          a: 1
                        }
                      }
                    ],
                    strokes: [],
                    strokeWeight: 1,
                    strokeAlign: "OUTSIDE",
                    effects: [],
                    characters: "Secondary",
                    style: {
                      fontFamily: "Roboto",
                      fontPostScriptName: "Roboto-Bold",
                      fontWeight: 700,
                      fontSize: 14,
                      textAlignHorizontal: "CENTER",
                      textAlignVertical: "TOP",
                      letterSpacing: 0,
                      lineHeightPx: 16.40625,
                      lineHeightPercent: 100,
                      lineHeightUnit: "INTRINSIC_%"
                    },
                    characterStyleOverrides: [],
                    styleOverrideTable: {}
                  }
                ],
                absoluteBoundingBox: {
                  x: -240,
                  y: 101,
                  width: 112,
                  height: 39
                },
                constraints: {
                  vertical: "TOP",
                  horizontal: "LEFT"
                },
                clipsContent: false,
                background: [
                  {
                    blendMode: "NORMAL",
                    visible: false,
                    type: "SOLID",
                    color: {
                      r: 1,
                      g: 1,
                      b: 1,
                      a: 1
                    }
                  }
                ],
                backgroundColor: {
                  r: 0,
                  g: 0,
                  b: 0,
                  a: 0
                },
                effects: [],
                componentId: "14:15"
              },
              {
                id: "14:16",
                name: "Another Secondary",
                type: "INSTANCE",
                blendMode: "PASS_THROUGH",
                children: [
                  {
                    id: "I14:16;14:13",
                    name: "Rectangle 2",
                    type: "RECTANGLE",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -117,
                      y: 101,
                      width: 112,
                      height: 39
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "SCALE"
                    },
                    fills: [],
                    strokes: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 0,
                          g: 0,
                          b: 0,
                          a: 1
                        }
                      }
                    ],
                    strokeWeight: 1,
                    strokeAlign: "INSIDE",
                    effects: [],
                    cornerRadius: 4,
                    rectangleCornerRadii: [4, 4, 4, 4]
                  },
                  {
                    id: "I14:16;14:14",
                    name: "Secondary",
                    type: "TEXT",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -94,
                      y: 114,
                      width: 67,
                      height: 16
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "CENTER"
                    },
                    fills: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 0,
                          g: 0,
                          b: 0,
                          a: 1
                        }
                      }
                    ],
                    strokes: [],
                    strokeWeight: 1,
                    strokeAlign: "OUTSIDE",
                    effects: [],
                    characters: "Secondary",
                    style: {
                      fontFamily: "Roboto",
                      fontPostScriptName: "Roboto-Bold",
                      fontWeight: 700,
                      fontSize: 14,
                      textAlignHorizontal: "CENTER",
                      textAlignVertical: "TOP",
                      letterSpacing: 0,
                      lineHeightPx: 16.40625,
                      lineHeightPercent: 100,
                      lineHeightUnit: "INTRINSIC_%"
                    },
                    characterStyleOverrides: [],
                    styleOverrideTable: {}
                  }
                ],
                absoluteBoundingBox: {
                  x: -117,
                  y: 101,
                  width: 112,
                  height: 39
                },
                constraints: {
                  vertical: "TOP",
                  horizontal: "LEFT"
                },
                clipsContent: false,
                background: [
                  {
                    blendMode: "NORMAL",
                    visible: false,
                    type: "SOLID",
                    color: {
                      r: 1,
                      g: 1,
                      b: 1,
                      a: 1
                    }
                  }
                ],
                backgroundColor: {
                  r: 0,
                  g: 0,
                  b: 0,
                  a: 0
                },
                effects: [],
                componentId: "14:15"
              }
            ],
            absoluteBoundingBox: {
              x: -265,
              y: -230,
              width: 310,
              height: 420
            },
            constraints: {
              vertical: "TOP",
              horizontal: "LEFT"
            },
            clipsContent: true,
            background: [
              {
                blendMode: "NORMAL",
                type: "SOLID",
                color: {
                  r: 1,
                  g: 1,
                  b: 1,
                  a: 1
                }
              }
            ],
            backgroundColor: {
              r: 1,
              g: 1,
              b: 1,
              a: 1
            },
            effects: []
          },
          {
            id: "16:0",
            name: "Text outside frame",
            type: "TEXT",
            blendMode: "PASS_THROUGH",
            absoluteBoundingBox: {
              x: -18,
              y: -302,
              width: 79,
              height: 41
            },
            constraints: {
              vertical: "TOP",
              horizontal: "LEFT"
            },
            fills: [
              {
                blendMode: "NORMAL",
                type: "SOLID",
                color: {
                  r: 0,
                  g: 0,
                  b: 0,
                  a: 1
                }
              }
            ],
            strokes: [],
            strokeWeight: 1,
            strokeAlign: "OUTSIDE",
            effects: [],
            characters: "Text outside frame",
            style: {
              fontFamily: "Roboto",
              fontPostScriptName: "Roboto-Bold",
              fontWeight: 700,
              fontSize: 12,
              textAlignHorizontal: "LEFT",
              textAlignVertical: "TOP",
              letterSpacing: 0,
              lineHeightPx: 14.0625,
              lineHeightPercent: 100,
              lineHeightUnit: "INTRINSIC_%"
            },
            characterStyleOverrides: [],
            styleOverrideTable: {}
          }
        ],
        backgroundColor: {
          r: 0.8980392217636108,
          g: 0.8980392217636108,
          b: 0.8980392217636108,
          a: 1
        },
        prototypeStartNodeID: null
      },
      {
        id: "5:1",
        name: "Symbols",
        type: "CANVAS",
        children: [
          {
            id: "5:0",
            name: "Buttons",
            type: "FRAME",
            blendMode: "PASS_THROUGH",
            children: [
              {
                id: "4:4",
                name: "Default",
                type: "COMPONENT",
                blendMode: "PASS_THROUGH",
                children: [
                  {
                    id: "4:2",
                    name: "Rectangle 2",
                    type: "RECTANGLE",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -264,
                      y: -391,
                      width: 112,
                      height: 39
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "SCALE"
                    },
                    fills: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 0,
                          g: 0,
                          b: 0,
                          a: 1
                        }
                      }
                    ],
                    strokes: [],
                    strokeWeight: 1,
                    strokeAlign: "INSIDE",
                    effects: [],
                    cornerRadius: 4,
                    rectangleCornerRadii: [4, 4, 4, 4]
                  },
                  {
                    id: "4:3",
                    name: "Label",
                    type: "TEXT",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -225,
                      y: -378,
                      width: 35,
                      height: 16
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "CENTER"
                    },
                    fills: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 1,
                          g: 1,
                          b: 1,
                          a: 1
                        }
                      }
                    ],
                    strokes: [],
                    strokeWeight: 1,
                    strokeAlign: "OUTSIDE",
                    effects: [],
                    characters: "Label",
                    style: {
                      fontFamily: "Roboto",
                      fontPostScriptName: "Roboto-Bold",
                      fontWeight: 700,
                      fontSize: 14,
                      textAlignHorizontal: "CENTER",
                      textAlignVertical: "TOP",
                      letterSpacing: 0,
                      lineHeightPx: 16.40625,
                      lineHeightPercent: 100,
                      lineHeightUnit: "INTRINSIC_%"
                    },
                    characterStyleOverrides: [],
                    styleOverrideTable: {}
                  }
                ],
                absoluteBoundingBox: {
                  x: -264,
                  y: -391,
                  width: 112,
                  height: 39
                },
                constraints: {
                  vertical: "TOP",
                  horizontal: "LEFT"
                },
                clipsContent: false,
                background: [
                  {
                    blendMode: "NORMAL",
                    visible: false,
                    type: "SOLID",
                    color: {
                      r: 1,
                      g: 1,
                      b: 1,
                      a: 1
                    }
                  }
                ],
                backgroundColor: {
                  r: 0,
                  g: 0,
                  b: 0,
                  a: 0
                },
                effects: []
              },
              {
                id: "14:15",
                name: "Secondary",
                type: "COMPONENT",
                blendMode: "PASS_THROUGH",
                children: [
                  {
                    id: "14:13",
                    name: "Rectangle 2",
                    type: "RECTANGLE",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -264,
                      y: -311,
                      width: 112,
                      height: 39
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "SCALE"
                    },
                    fills: [],
                    strokes: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 0,
                          g: 0,
                          b: 0,
                          a: 1
                        }
                      }
                    ],
                    strokeWeight: 1,
                    strokeAlign: "INSIDE",
                    effects: [],
                    cornerRadius: 4,
                    rectangleCornerRadii: [4, 4, 4, 4]
                  },
                  {
                    id: "14:14",
                    name: "Label",
                    type: "TEXT",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -225,
                      y: -298,
                      width: 35,
                      height: 16
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "CENTER"
                    },
                    fills: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 0,
                          g: 0,
                          b: 0,
                          a: 1
                        }
                      }
                    ],
                    strokes: [],
                    strokeWeight: 1,
                    strokeAlign: "OUTSIDE",
                    effects: [],
                    characters: "Label",
                    style: {
                      fontFamily: "Roboto",
                      fontPostScriptName: "Roboto-Bold",
                      fontWeight: 700,
                      fontSize: 14,
                      textAlignHorizontal: "CENTER",
                      textAlignVertical: "TOP",
                      letterSpacing: 0,
                      lineHeightPx: 16.40625,
                      lineHeightPercent: 100,
                      lineHeightUnit: "INTRINSIC_%"
                    },
                    characterStyleOverrides: [],
                    styleOverrideTable: {}
                  }
                ],
                absoluteBoundingBox: {
                  x: -264,
                  y: -311,
                  width: 112,
                  height: 39
                },
                constraints: {
                  vertical: "TOP",
                  horizontal: "LEFT"
                },
                clipsContent: false,
                background: [
                  {
                    blendMode: "NORMAL",
                    visible: false,
                    type: "SOLID",
                    color: {
                      r: 1,
                      g: 1,
                      b: 1,
                      a: 1
                    }
                  }
                ],
                backgroundColor: {
                  r: 0,
                  g: 0,
                  b: 0,
                  a: 0
                },
                effects: []
              },
              {
                id: "17:3",
                name: "Secondary",
                type: "COMPONENT",
                blendMode: "PASS_THROUGH",
                children: [
                  {
                    id: "29:1",
                    name: "Rectangle 2",
                    type: "RECTANGLE",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -264,
                      y: -223,
                      width: 112,
                      height: 39
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "SCALE"
                    },
                    fills: [],
                    strokes: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 0,
                          g: 0,
                          b: 0,
                          a: 1
                        }
                      }
                    ],
                    strokeWeight: 1,
                    strokeAlign: "INSIDE",
                    effects: [],
                    cornerRadius: 4,
                    rectangleCornerRadii: [4, 4, 4, 4]
                  },
                  {
                    id: "29:2",
                    name: "component with same name",
                    type: "TEXT",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -297,
                      y: -210,
                      width: 178,
                      height: 16
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "CENTER"
                    },
                    fills: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 0,
                          g: 0,
                          b: 0,
                          a: 1
                        }
                      }
                    ],
                    strokes: [],
                    strokeWeight: 1,
                    strokeAlign: "OUTSIDE",
                    effects: [],
                    characters: "component with same name",
                    style: {
                      fontFamily: "Roboto",
                      fontPostScriptName: "Roboto-Bold",
                      fontWeight: 700,
                      fontSize: 14,
                      textAlignHorizontal: "CENTER",
                      textAlignVertical: "TOP",
                      letterSpacing: 0,
                      lineHeightPx: 16.40625,
                      lineHeightPercent: 100,
                      lineHeightUnit: "INTRINSIC_%"
                    },
                    characterStyleOverrides: [],
                    styleOverrideTable: {}
                  }
                ],
                absoluteBoundingBox: {
                  x: -264,
                  y: -223,
                  width: 112,
                  height: 39
                },
                constraints: {
                  vertical: "TOP",
                  horizontal: "LEFT"
                },
                clipsContent: false,
                background: [
                  {
                    blendMode: "NORMAL",
                    visible: false,
                    type: "SOLID",
                    color: {
                      r: 1,
                      g: 1,
                      b: 1,
                      a: 1
                    }
                  }
                ],
                backgroundColor: {
                  r: 0,
                  g: 0,
                  b: 0,
                  a: 0
                },
                effects: []
              },
              {
                id: "17:6",
                name: "Feint Button",
                type: "COMPONENT",
                blendMode: "PASS_THROUGH",
                children: [
                  {
                    id: "17:5",
                    name: "Rectangle",
                    type: "RECTANGLE",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -293,
                      y: -143,
                      width: 170,
                      height: 90
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "SCALE"
                    },
                    fills: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 1,
                          g: 1,
                          b: 1,
                          a: 1
                        }
                      }
                    ],
                    strokes: [],
                    strokeWeight: 1,
                    strokeAlign: "INSIDE",
                    effects: []
                  },
                  {
                    id: "17:4",
                    name: "Feint Label",
                    type: "TEXT",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -250,
                      y: -110,
                      width: 104,
                      height: 25
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "SCALE"
                    },
                    fills: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 0.9208333492279053,
                          g: 0.9208333492279053,
                          b: 0.9208333492279053,
                          a: 1
                        }
                      }
                    ],
                    strokes: [],
                    strokeWeight: 1,
                    strokeAlign: "OUTSIDE",
                    effects: [],
                    characters: "Feint Label",
                    style: {
                      fontFamily: "Roboto",
                      fontPostScriptName: "Roboto-Bold",
                      fontWeight: 700,
                      fontSize: 21,
                      textAlignHorizontal: "LEFT",
                      textAlignVertical: "TOP",
                      letterSpacing: 0,
                      lineHeightPx: 24.609375,
                      lineHeightPercent: 100,
                      lineHeightUnit: "INTRINSIC_%"
                    },
                    characterStyleOverrides: [],
                    styleOverrideTable: {}
                  }
                ],
                absoluteBoundingBox: {
                  x: -293,
                  y: -143,
                  width: 170,
                  height: 90
                },
                constraints: {
                  vertical: "TOP",
                  horizontal: "LEFT"
                },
                clipsContent: false,
                background: [
                  {
                    blendMode: "NORMAL",
                    visible: false,
                    type: "SOLID",
                    color: {
                      r: 1,
                      g: 1,
                      b: 1,
                      a: 1
                    }
                  }
                ],
                backgroundColor: {
                  r: 0,
                  g: 0,
                  b: 0,
                  a: 0
                },
                effects: []
              }
            ],
            absoluteBoundingBox: {
              x: -305,
              y: -421,
              width: 195,
              height: 493
            },
            constraints: {
              vertical: "TOP",
              horizontal: "LEFT"
            },
            clipsContent: true,
            background: [
              {
                blendMode: "NORMAL",
                type: "SOLID",
                color: {
                  r: 1,
                  g: 1,
                  b: 1,
                  a: 1
                }
              }
            ],
            backgroundColor: {
              r: 1,
              g: 1,
              b: 1,
              a: 1
            },
            effects: []
          },
          {
            id: "15:0",
            name: "Cards",
            type: "FRAME",
            blendMode: "PASS_THROUGH",
            children: [
              {
                id: "15:9",
                name: "Card",
                type: "COMPONENT",
                blendMode: "PASS_THROUGH",
                children: [
                  {
                    id: "15:7",
                    name: "Rectangle",
                    type: "RECTANGLE",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -43,
                      y: -380,
                      width: 419,
                      height: 318
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "SCALE"
                    },
                    fills: [],
                    strokes: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 0.8980392217636108,
                          g: 0.8980392217636108,
                          b: 0.8980392217636108,
                          a: 1
                        }
                      }
                    ],
                    strokeWeight: 1,
                    strokeAlign: "INSIDE",
                    effects: [],
                    cornerRadius: 3,
                    rectangleCornerRadii: [3, 3, 3, 3]
                  },
                  {
                    id: "15:8",
                    name: "Heading",
                    type: "TEXT",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: -30,
                      y: -367,
                      width: 53,
                      height: 16
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "SCALE"
                    },
                    fills: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 0,
                          g: 0,
                          b: 0,
                          a: 1
                        }
                      }
                    ],
                    strokes: [],
                    strokeWeight: 1,
                    strokeAlign: "OUTSIDE",
                    effects: [],
                    characters: "Heading",
                    style: {
                      fontFamily: "Roboto",
                      fontPostScriptName: "Roboto-Bold",
                      fontWeight: 700,
                      fontSize: 14,
                      textAlignHorizontal: "LEFT",
                      textAlignVertical: "TOP",
                      letterSpacing: 0,
                      lineHeightPx: 16.40625,
                      lineHeightPercent: 100,
                      lineHeightUnit: "INTRINSIC_%"
                    },
                    characterStyleOverrides: [],
                    styleOverrideTable: {}
                  },
                  {
                    id: "28:3",
                    name: "OnlyUsedInAnotherComponent",
                    type: "INSTANCE",
                    blendMode: "PASS_THROUGH",
                    children: [
                      {
                        id: "I28:3;28:1",
                        name: ">>>>",
                        type: "TEXT",
                        blendMode: "PASS_THROUGH",
                        absoluteBoundingBox: {
                          x: 326,
                          y: -100,
                          width: 29,
                          height: 16
                        },
                        constraints: {
                          vertical: "SCALE",
                          horizontal: "SCALE"
                        },
                        fills: [
                          {
                            blendMode: "NORMAL",
                            type: "SOLID",
                            color: {
                              r: 0,
                              g: 0,
                              b: 0,
                              a: 1
                            }
                          }
                        ],
                        strokes: [],
                        strokeWeight: 1,
                        strokeAlign: "OUTSIDE",
                        effects: [],
                        characters: ">>>>",
                        style: {
                          fontFamily: "Roboto",
                          fontPostScriptName: "Roboto-Bold",
                          fontWeight: 700,
                          fontSize: 14,
                          textAlignHorizontal: "LEFT",
                          textAlignVertical: "TOP",
                          letterSpacing: 0,
                          lineHeightPx: 16.40625,
                          lineHeightPercent: 100,
                          lineHeightUnit: "INTRINSIC_%"
                        },
                        characterStyleOverrides: [],
                        styleOverrideTable: {}
                      }
                    ],
                    absoluteBoundingBox: {
                      x: 326,
                      y: -100,
                      width: 29,
                      height: 16
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "SCALE"
                    },
                    clipsContent: false,
                    background: [
                      {
                        blendMode: "NORMAL",
                        visible: false,
                        type: "SOLID",
                        color: {
                          r: 1,
                          g: 1,
                          b: 1,
                          a: 1
                        }
                      }
                    ],
                    backgroundColor: {
                      r: 0,
                      g: 0,
                      b: 0,
                      a: 0
                    },
                    effects: [],
                    componentId: "28:2"
                  }
                ],
                absoluteBoundingBox: {
                  x: -43,
                  y: -380,
                  width: 419,
                  height: 318
                },
                constraints: {
                  vertical: "TOP",
                  horizontal: "LEFT"
                },
                clipsContent: false,
                background: [
                  {
                    blendMode: "NORMAL",
                    visible: false,
                    type: "SOLID",
                    color: {
                      r: 1,
                      g: 1,
                      b: 1,
                      a: 1
                    }
                  }
                ],
                backgroundColor: {
                  r: 0,
                  g: 0,
                  b: 0,
                  a: 0
                },
                effects: []
              }
            ],
            absoluteBoundingBox: {
              x: -87,
              y: -421,
              width: 498,
              height: 400
            },
            constraints: {
              vertical: "TOP",
              horizontal: "LEFT"
            },
            clipsContent: true,
            background: [
              {
                blendMode: "NORMAL",
                type: "SOLID",
                color: {
                  r: 1,
                  g: 1,
                  b: 1,
                  a: 1
                }
              }
            ],
            backgroundColor: {
              r: 1,
              g: 1,
              b: 1,
              a: 1
            },
            effects: []
          },
          {
            id: "28:0",
            name: "Misc",
            type: "FRAME",
            blendMode: "PASS_THROUGH",
            children: [
              {
                id: "28:2",
                name: "OnlyUsedInAnotherComponent",
                type: "COMPONENT",
                blendMode: "PASS_THROUGH",
                children: [
                  {
                    id: "28:1",
                    name: ">>>>",
                    type: "TEXT",
                    blendMode: "PASS_THROUGH",
                    absoluteBoundingBox: {
                      x: 536,
                      y: -362,
                      width: 29,
                      height: 16
                    },
                    constraints: {
                      vertical: "SCALE",
                      horizontal: "SCALE"
                    },
                    fills: [
                      {
                        blendMode: "NORMAL",
                        type: "SOLID",
                        color: {
                          r: 0,
                          g: 0,
                          b: 0,
                          a: 1
                        }
                      }
                    ],
                    strokes: [],
                    strokeWeight: 1,
                    strokeAlign: "OUTSIDE",
                    effects: [],
                    characters: ">>>>",
                    style: {
                      fontFamily: "Roboto",
                      fontPostScriptName: "Roboto-Bold",
                      fontWeight: 700,
                      fontSize: 14,
                      textAlignHorizontal: "LEFT",
                      textAlignVertical: "TOP",
                      letterSpacing: 0,
                      lineHeightPx: 16.40625,
                      lineHeightPercent: 100,
                      lineHeightUnit: "INTRINSIC_%"
                    },
                    characterStyleOverrides: [],
                    styleOverrideTable: {}
                  }
                ],
                absoluteBoundingBox: {
                  x: 536,
                  y: -362,
                  width: 29,
                  height: 16
                },
                constraints: {
                  vertical: "TOP",
                  horizontal: "LEFT"
                },
                clipsContent: false,
                background: [
                  {
                    blendMode: "NORMAL",
                    visible: false,
                    type: "SOLID",
                    color: {
                      r: 1,
                      g: 1,
                      b: 1,
                      a: 1
                    }
                  }
                ],
                backgroundColor: {
                  r: 0,
                  g: 0,
                  b: 0,
                  a: 0
                },
                effects: []
              }
            ],
            absoluteBoundingBox: {
              x: 431,
              y: -421,
              width: 228,
              height: 172
            },
            constraints: {
              vertical: "TOP",
              horizontal: "LEFT"
            },
            clipsContent: true,
            background: [
              {
                blendMode: "NORMAL",
                type: "SOLID",
                color: {
                  r: 1,
                  g: 1,
                  b: 1,
                  a: 1
                }
              }
            ],
            backgroundColor: {
              r: 1,
              g: 1,
              b: 1,
              a: 1
            },
            effects: []
          }
        ],
        backgroundColor: {
          r: 0.8980392217636108,
          g: 0.8980392217636108,
          b: 0.8980392217636108,
          a: 1
        },
        prototypeStartNodeID: null
      }
    ]
  },
  components: {
    "4:4": {
      key: "",
      name: "Default",
      description: ""
    },
    "14:15": {
      key: "",
      name: "Secondary",
      description: ""
    },
    "17:3": {
      key: "",
      name: "Secondary",
      description: ""
    },
    "17:6": {
      key: "",
      name: "Feint Button",
      description: ""
    },
    "28:2": {
      key: "",
      name: "OnlyUsedInAnotherComponent",
      description: ""
    },
    "15:9": {
      key: "",
      name: "Card",
      description: ""
    }
  },
  schemaVersion: 0,
  styles: {
    "1:4": {
      key: "6423a47a86252d4f1f83891572fef19b8a8dfcc5",
      name: "Heading",
      styleType: "TEXT"
    },
    "1:7": {
      key: "2a4d9307a0f2fc42ff4e4eae7991b557b8618c73",
      name: "red",
      styleType: "FILL"
    }
  },
  name: "Test X-Ray Doc",
  lastModified: "2019-05-25T11:44:28.79415Z",
  thumbnailUrl:
    "https://s3-alpha-sig.figma.com/thumbnails/4fcc34ca-d8e8-4551-8b2b-6453cfa56c49?Expires=1559520000&Signature=XUkZ5NxtC94bvCllc-SjRi8OcTnDHl9KvhmOkDgq7rrYcIKaKNJ1APhxFBt5Wip7moMN24PTX-tKlF6NRqVX3k7DpZEKNBbqYqKXk9Bb5OfomWmtiaf1J8W6hi61esBO~rkQmnmpnR8sDtWy~vCIRm~Y~DqFtcgtDCCs8h5fD6a-P67FwaoWA~YrElHtt2oCzscURhM2BuZwI8jeQ~74y0UBfpY0rr~PT4tmVg8Ea~Nrf0YXkMBmR4MyJsQGOUTA7EVLQOVW7gPKqb5GInTLv3sDrzp-Bb8cfjAEE8Ale7J58frXgKFaBnC4pi1uokXDkDd5sUZx4YYtuccxqFWbwA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
  version: "134743829"
};

export default fileResponse;

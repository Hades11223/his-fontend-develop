import { range } from 'lodash';

export const SIZE = {
  columnWidth: 75,
  leftColumnWidth: 150,
  headerHeight: 110,
  rowHeight: 7,
  bottomHeight: 250,
};

export const RADIUS_POINTER = 5;

export const MACHS = [42, 41, 40, 39, 38, 37, 36, 35];
export const NHIETS = [180, 160, 140, 120, 100, 80, 60, 40];

export const BLOOD_PRESSURE = [
  { min: 30, max: 180, listShow: range(180, 39, -20) },
  { min: 181, max: 230, listShow: range(230, 89, -20) },
  { min: 231, max: 280, listShow: range(280, 139, -20) },
  { min: 281, max: 330, listShow: range(330, 189, -20) },
  { min: 331, max: 380, listShow: range(380, 239, -20) },
];

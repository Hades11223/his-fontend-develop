import React, { useState, forwardRef, useImperativeHandle } from 'react';
import T from 'prop-types';
import { Main } from './styled';

const composeClassname = (cKey, rKey, cellFocused, rF, cF) => {
  return `
    tb-control-item
    ${cF.key === cKey || rF.key === rKey ? 'tb-control-item-focused' : ''}
    ${cellFocused === `${rKey}_${cKey}` ? 'tb-control-cel-focused' : ''}
  `;
};

const TableControl = forwardRef((props, ref) => {
  const { rows, cols, handleChangeFocus, setWidth } = props;
  const [colFocused, setColFocused] = useState({});
  const [rowFocused, setRowFocused] = useState({});
  const [cellFocused, setCellFocused] = useState('');

  useImperativeHandle(ref, () => ({
    row: rowFocused,
    col: colFocused
  }));

  const handleClickCell = (row, col) => () => {
    setColFocused(col);
    setRowFocused(row);
    setCellFocused(`${row.key}_${col.key}`);
    handleChangeFocus({ row, col })
  };

  return (
    <Main>
      <table className={'tb-control'}>
        <tbody>
        {rows.map((r, rIndex) => (
          <tr key={r.key}>
            {cols.map(c => (
              <td key={c.key}>
                <div
                  style={{ width: setWidth ? (472 - 24)*c.width : '48px' }}
                  className={composeClassname(c.key, r.key, cellFocused, rowFocused, colFocused)}
                  onClick={handleClickCell(r, c)}
                >
                  {setWidth && rIndex === 0 && `${c.width*100} %`}
                </div>
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </Main>
  );
});

TableControl.defaultProps = {
  rows: [],
  cols: [],
  handleChangeFocus: () => {},
};

TableControl.propTypes = {
  rows: T.arrayOf(T.shape({})),
  cols: T.arrayOf(T.shape({})),
  handleChangeFocus: T.func,
};

export default TableControl;

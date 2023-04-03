import React from 'react'
import { SelectableGroup, createSelectable } from 'react-selectable';
import Node from './Node';

const SelectableComponent = createSelectable(Node);

function NodeBordEdit({ grid, memoizedGrid, handleOnEndSelection, selectedKeys }) {


    return (
        <SelectableGroup onEndSelection={handleOnEndSelection} >

            {grid?.map((row, rowIdx) => {
                return (
                    <tr
                        key={rowIdx}>
                        {row.map(({ ...res }, nodeIdx) => {
                            const { row, col } = res;
                            const selected = selectedKeys.indexOf(`${row}-${col}`) > -1;

                            return (
                                <td >
                                    <SelectableComponent
                                        {...res} key={nodeIdx} selected={selected} selectableKey={`node-${row}-${col}`}>
                                    </SelectableComponent>
                                </td>
                            )
                        })}
                    </tr>
                );
            })}
        </SelectableGroup>
    )
}

export default NodeBordEdit
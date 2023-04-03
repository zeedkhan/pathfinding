import { useState } from 'react';
import { List, Divider, ListItemButton, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Select from 'react-select'

const options = [
    { value: 'Path', label: 'Path', terrainType: 0 },
    { value: 'Water', label: 'Water', terrainType: 1 },
    { value: 'Mountain', label: 'Mountain', terrainType: 2 },
    { value: 'Wall', label: "Wall", terrainType: 3 }
]

const CustomSelect = ({ node, handleChangeTerrainType }) => {
    return <Select
        onChange={(e) => handleChangeTerrainType(e, node)}
        defaultValue={options.find((i) => i.terrainType === node.terrainType)}
        options={options} />
}

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};

function Table({ grid, data, handleChangeTerrainType }) {
    const [open, setOpen] = useState(Array(data.length).fill().map(_ => false));

    const handleClick = (key) => {
        const newValue = open.map((item, keyItem) => keyItem === key ? !item : false);

        setOpen(newValue);
    };

    return (

        <List sx={style}>
            {data.map((row, key) =>
                <>
                    <ListItemButton
                        primary={key + 1}
                        onClick={() => handleClick(key)}
                    >

                        {((row.length * key) + 1) + " - " + ((((row.length * key)) + row.length))} {open[key] ? <ExpandLess /> : <ExpandMore />}

                        {/* {((row.length * key) + 1) + " - " + (row.length*2)*(key)} {open[key] ? <ExpandLess /> : <ExpandMore />} */}
                    </ListItemButton>

                    <Collapse in={open[key]} timeout="auto" unmountOnExit>
                        {row.map((node, nodeKey) => (
                            <div
                                onMouseOver={() => {
                                    const { row, col } = node;

                                    const tempData = grid.slice();

                                    tempData.map((currentRow, keyRow) => {
                                        currentRow.map((currentNode, keyNode) => {
                                            const curRow = currentNode.row;
                                            const curCol = currentNode.col;
                                            if (tempData[row][col] !== tempData[curRow][curCol]) {
                                                const htmlNode = document.getElementById(`node-${keyRow}-${keyNode}`);

                                                htmlNode.style.background = "black"
                                            }
                                        })
                                    })
                                }}

                                onMouseOut={() => {
                                    const tempData = grid.slice();

                                    tempData.map((currentRow, keyRow) => {
                                        currentRow.map((currentCol, keyCol) => {
                                            const htmlNode = document.getElementById(`node-${keyRow}-${keyCol}`);
                                            if (!!htmlNode) {
                                                htmlNode.style.background = ""
                                            }
                                        })
                                    })
                                }}

                                key={nodeKey}

                            >
                                <List component="div" disablePadding>
                                    <p>Position: [{node.row}, {node.col}]</p>

                                    <ul className='flex flex-col'>
                                        <li>Visited: {"" + node.isVisited}</li>
                                        <li>Wall: {"" + node.isWall}</li>

                                        <div className='flex flex-col'>
                                            <h4>Weight: </h4>
                                            <li className='flex w-fit justify-between'>
                                                <label className='min-w-[40px]'>G</label>
                                                <input className="text-center max-w-[100px] bg-white cursor-not-allowed" type="number" disabled={true} value={node.weight.g} />

                                            </li>
                                            <li className='flex w-fit justify-between'>
                                                <label className='min-w-[40px]'>F</label>
                                                <input className="text-center max-w-[100px] bg-white cursor-not-allowed" type="number" disabled={true} value={node.weight.f} />

                                            </li>
                                            <li className='flex w-fit justify-between'>
                                                <label className='min-w-[40px]'>H</label>
                                                <input className="text-center max-w-[100px] bg-white cursor-not-allowed" type="number" disabled={true} value={node.weight.h} />

                                            </li>
                                            <li className='flex w-fit justify-between'>
                                                <label className='min-w-[40px]'>Terrain</label>
                                                <input className="text-center max-w-[100px] bg-white cursor-not-allowed" type="string" disabled={true} value={node.weight.terrain} />

                                            </li>
                                            <li className='flex w-fit justify-between'>
                                                <label className='min-w-[40px]'>Type</label>
                                                {/* <input className="text-center max-w-[100px] bg-white" type="number" disabled={true} value={node.terrainType} /> */}
                                                <CustomSelect node={node} handleChangeTerrainType={handleChangeTerrainType} />
                                            </li>



                                        </div>


                                    </ul>

                                </List>

                            </div>
                        ))}
                    </Collapse>
                </>
            )}

        </List>

        // <p>{JSON.stringify(data)}</p>

        // <List sx={style} component="nav">

        //     {data.map((row, key) => (
        //         <>
        //             <ListItemButton primary={key + 1} onClick={() => handleClick(key)} >
        //                 {key + 1} {open[key] ? <ExpandLess /> : <ExpandMore />}
        //             </ListItemButton>

        //             <List component="div" disablePadding>
        //                 <List sx={{ pl: 4 }}>

        //                     <List component="div">
        //                         <Collapse in={open[key]} timeout="auto" unmountOnExit>
        //                             {row.map((row, rowKey) => {
        //                                 return (
        //                                     <List component="div" disablePadding>
        //                                         {row.map((node) => (
        //                                             <List component="div" divider disablePadding>

        //                                                 <div
        //                                                     onMouseOver={() => {
        //                                                         const { row, col } = node;

        //                                                         const tempData = grid.slice();

        //                                                         tempData.map((currentRow, keyRow) => {
        //                                                             currentRow.map((currentNode, keyNode) => {
        //                                                                 const curRow = currentNode.row;
        //                                                                 const curCol = currentNode.col;
        //                                                                 if (tempData[row][col] !== tempData[curRow][curCol]) {
        //                                                                     const htmlNode = document.getElementById(`node-${keyRow}-${keyNode}`);

        //                                                                     htmlNode.style.background = "black"
        //                                                                 }
        //                                                             })
        //                                                         })
        //                                                     }}

        //                                                     onMouseOut={() => {
        //                                                         const tempData = grid.slice();

        //                                                         tempData.map((currentRow, keyRow) => {
        //                                                             currentRow.map((currentCol, keyCol) => {
        //                                                                 const htmlNode = document.getElementById(`node-${keyRow}-${keyCol}`);
        //                                                                 if (!!htmlNode) {
        //                                                                     htmlNode.style.background = ""
        //                                                                 }
        //                                                             })
        //                                                         })
        //                                                     }}

        //                                                 >


        //                                                     <p>Position: [{node.row}, {node.col}]</p>



        //                                                     <ul className='flex flex-col'>
        //                                                         <li>Visited: {"" + node.isVisited}</li>
        //                                                         <li>Wall: {"" + node.isWall}</li>

        //                                                         <div className='flex flex-col'>
        //                                                             <h4>Weight: </h4>
        //                                                             <li className='flex w-fit justify-between'>
        //                                                                 <label className='min-w-[40px]'>G</label>
        //                                                                 <input className="text-center max-w-[100px] bg-white cursor-not-allowed" type="number" disabled={true} value={node.weight.g} />

        //                                                             </li>
        //                                                             <li className='flex w-fit justify-between'>
        //                                                                 <label className='min-w-[40px]'>F</label>
        //                                                                 <input className="text-center max-w-[100px] bg-white cursor-not-allowed" type="number" disabled={true} value={node.weight.f} />

        //                                                             </li>
        //                                                             <li className='flex w-fit justify-between'>
        //                                                                 <label className='min-w-[40px]'>H</label>
        //                                                                 <input className="text-center max-w-[100px] bg-white cursor-not-allowed" type="number" disabled={true} value={node.weight.h} />

        //                                                             </li>
        //                                                             <li className='flex w-fit justify-between'>
        //                                                                 <label className='min-w-[40px]'>Terrain</label>
        //                                                                 <input className="text-center max-w-[100px] bg-white cursor-not-allowed" type="string" disabled={true} value={node.weight.terrain} />

        //                                                             </li>
        //                                                             <li className='flex w-fit justify-between'>
        //                                                                 <label className='min-w-[40px]'>Type</label>
        //                                                                 {/* <input className="text-center max-w-[100px] bg-white" type="number" disabled={true} value={node.terrainType} /> */}
        //                                                                 <CustomSelect node={node} handleChangeTerrainType={handleChangeTerrainType} />
        //                                                             </li>



        //                                                         </div>


        //                                                     </ul>



        //                                                 </div>

        //                                                 <Divider />

        //                                             </List>

        //                                         ))}

        //                                     </List>
        //                                 )
        //                             })}
        //                         </Collapse>
        //                     </List>
        //                 </List>
        //             </List>
        //             <Divider />

        //         </>
        //     ))}

        // </List>


    );
}

export default Table;

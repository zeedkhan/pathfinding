import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { faMountainSun, faSquare, faShip, faGear } from '@fortawesome/free-solid-svg-icons'

import Table from './Table'



function Sidebar({ grid, handleChangeTerrainType }) {

    const [moutain, setMoutain] = useState([]);
    const [showMoutain, setShowMoutain] = useState(false);

    const [water, setWater] = useState([]);
    const [showWater, setShowWater] = useState(false);

    const [wall, setWall] = useState([]);
    const [showWall, setShowWall] = useState(false);

    const [editNodes, setEditNodes] = useState([]);

    const [showEdit, setShowEdit] = useState(false);


    const getAllMountains = () => {
        const tempGrid = grid.slice();
        const findMoutains = [...Array(grid.length)].map(e => []);

        for (const row of tempGrid) {
            for (const node of row) {
                if (node.terrainType === 2) {
                    findMoutains[node.row].push(node);
                }
            }
        }

        const getRowContainsMoutain = findMoutains.filter((item) => item.length > 0).flat();


        const perChunk = 20 // items per chunk    

        const result = getRowContainsMoutain.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / perChunk)

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item)

            return resultArray
        }, [])

        setMoutain(result);
    }

    const getAllWaters = () => {
        const tempGrid = grid.slice();
        const findWaters = [...Array(grid.length)].map(e => []);

        for (const row of tempGrid) {
            for (const node of row) {
                if (node.terrainType === 1) {
                    findWaters[node.row].push(node);
                }
            }
        }

        const getRowContainsMoutain = findWaters.filter((item) => item.length > 0).flat();


        const perChunk = 20 // items per chunk    

        const result = getRowContainsMoutain.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / perChunk)

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item)

            return resultArray
        }, [])

        setWater(result);
    }

    const getAllWalls = () => {
        const tempGrid = grid.slice();
        const findWaters = [...Array(grid.length)].map(e => []);

        for (const row of tempGrid) {
            for (const node of row) {
                if (node.isWall) {
                    findWaters[node.row].push(node);
                }
            }
        }

        const getRowContainsMoutain = findWaters.filter((item) => item.length > 0).flat();


        const perChunk = 20 // items per chunk    

        const result = getRowContainsMoutain.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / perChunk)

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item)

            return resultArray
        }, [])

        setWall(result);
    }

    const getAllEdit = () => {
        const tempGrid = grid.slice();
        const findWaters = [...Array(grid.length)].map(e => []);

        for (const row of tempGrid) {
            for (const node of row) {
                if (node.isEditing) {
                    findWaters[node.row].push(node);
                }
            }
        }

        const getRowContainsMoutain = findWaters.filter((item) => item.length > 0).flat();


        const perChunk = 20 // items per chunk    

        const result = getRowContainsMoutain.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / perChunk)

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item)

            return resultArray
        }, [])

        setEditNodes(result);
    }

    useEffect(() => {
        getAllMountains();
        getAllWaters();
        getAllWalls();
        getAllEdit();
    }, [grid]);

    return (
        <aside id="sidebar-multi-level-sidebar" className=" z-40 w-64 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <button
                            onClick={() => {
                                setShowMoutain(!showMoutain)
                            }}
                            type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                            <FontAwesomeIcon icon={faMountainSun} style={{ color: "#9CA3AF" }} />
                            <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Moutain</span>
                        </button>

                    </li>

                    {showMoutain && (
                        <div>
                            <Table grid={grid} data={moutain} handleChangeTerrainType={handleChangeTerrainType} />
                        </div>
                    )}



                    <li>
                        <button
                            onClick={() => {
                                setShowWater(!showWater)
                            }}
                            type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                            <FontAwesomeIcon icon={faShip} style={{ color: "#9CA3AF" }} />
                            <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Water</span>
                        </button>
                    </li>



                    {showWater && (
                        <div>
                            <Table grid={grid} data={water} handleChangeTerrainType={handleChangeTerrainType} />
                        </div>
                    )}


                    <li>
                        <button
                            onClick={() => {
                                setShowWall(!showWall);
                            }}
                            type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                            <FontAwesomeIcon icon={faSquare} style={{ color: "#9CA3AF" }} />
                            <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Wall</span>
                        </button>
                    </li>


                    {showWall && (
                        <div>
                            <Table grid={grid} data={wall} handleChangeTerrainType={handleChangeTerrainType} />
                        </div>
                    )}


                    <li>
                        <button
                            onClick={() => {
                                setShowEdit(!showEdit);
                            }}
                            type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                            <FontAwesomeIcon icon={faGear} style={{ color: "#9CA3AF" }} />
                            <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Edit</span>
                        </button>
                    </li>


                    {showEdit && (
                        <div>
                            <Table grid={grid} data={editNodes} handleChangeTerrainType={handleChangeTerrainType} />
                        </div>
                    )}

                </ul>
            </div>
        </aside>
    )
}

export default Sidebar

/* 

    Fix change terrrain with wall 
    the wall terrrain actually is using 0
    we need to fix by change isWall = !isWall


*/
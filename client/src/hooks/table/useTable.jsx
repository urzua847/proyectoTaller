import { useEffect, useRef, useState } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";
import '@styles/table.css';

function useTable({ data, columns, filter, dataToFilter, initialSortName, onSelectionChange }) {
    const tableRef = useRef(null);
    const [table, setTable] = useState(null);
    const [isTableBuilt, setIsTableBuilt] = useState(false);

    useEffect(() => {
        if (tableRef.current) {
            const updatedColumns = [
                { 
                    formatter: "rowSelection", 
                    titleFormatter: "rowSelection", 
                    hozAlign: "center", 
                    headerSort: false, 
                    cellClick: function (e, cell) {
                        cell.getRow().toggleSelect();
                    } 
                },
                ...columns
            ];
            const tabulatorTable = new Tabulator(tableRef.current, {
                data: [],
                columns: updatedColumns,
                layout: "fitColumns",
                pagination: true,
                paginationSize: 6,
                selectable: 1, // Permite seleccionar solo una fila a la vez
                langs: {
                    "default": { "pagination": { "first": "<<", "prev": "<", "next": ">", "last": ">>" } }
                },
                initialSort: [{ column: initialSortName, dir: "asc" }],
            });
            
            tabulatorTable.on("rowSelectionChanged", function(data, rows) {
                if (onSelectionChange) {
                    onSelectionChange(data);
                }
            });
            tabulatorTable.on("tableBuilt", function() {
                setIsTableBuilt(true);
            });
            setTable(tabulatorTable);

            return () => {
                tabulatorTable.destroy();
            };
        }
    }, []);

    useEffect(() => {
        if (table && isTableBuilt) {
            table.replaceData(data);
        }
    }, [data, table, isTableBuilt]);

    useEffect(() => {
        if (table && isTableBuilt) {
            table.setFilter(dataToFilter, "like", filter);
        }
    }, [filter, table, dataToFilter, isTableBuilt]);

    return { tableRef };
}
export default useTable;


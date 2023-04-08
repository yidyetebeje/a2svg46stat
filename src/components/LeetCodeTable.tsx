'use client';
import { leetcoderes } from '../interfaces/leetcoderes';
import { useState, useEffect, use } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, RowSelection, SortingState, useReactTable } from '@tanstack/react-table';
import React from 'react';
import Link from 'next/link';
import { DebouncedInput } from './DebounceInput';
import Pagination from './Pagination';
import Paginations from './Pagination';
async function getData(): Promise<leetcoderes[]>{
    const url = new URL('http://localhost:3000/api');
    const data = await fetch(url, {
        cache: 'no-store'
    });
    let res: {
        res: leetcoderes[];
    } = await data.json();
    console.log(res);
    return res.res;
}
const columnHelper = createColumnHelper<leetcoderes>();

const defaultColumns = [
    columnHelper.accessor(row => row.Name, {
        id: 'Name',
        cell: info => <p className='font-semibold'>{info.getValue()}</p>,
        header: () => <span>Name</span>,
    }),
    columnHelper.group({
        header: 'Solved Problems',
        columns: [
            columnHelper.accessor(row => row.easy, {
                id: 'easy',
                cell: info => info.getValue(),
                header: () => <span className='text-green-600'>Easy</span>,
            }),
            columnHelper.accessor(row => row.medium, {
                id: 'medium',
                cell: info => info.getValue(),
                header: () => <span className=' text-orange-700'>Medium</span>,
            }),
            columnHelper.accessor(row => row.hard, {
                id: 'hard',
                cell: info => info.getValue(),
                header: () => <span className='text-red-800'>Hard</span>,
            }),
            columnHelper.accessor(row => row.total, {
                id: 'total',
                cell: info => info.getValue(),
                header: () => <span className='text-blue-800'>Total</span>,
            }),
            columnHelper.accessor(row => row.totalsub, {
                id: 'totalsub',
                cell: info => info.getValue(),
                header: () => <span className='text-blue-800'>Total Submissions</span>,
            }),
            columnHelper.accessor(row => parseFloat((((row.total || 1) / (row.totalsub || 1)) * 100).toFixed(2)), {
                id: 'acceptance',
                cell: info => {
                    return info.getValue() > 40 ? <span className=' text-green-800'>{info.getValue()}%</span> : <span className='text-red-800'> {info.getValue()}%</span>
                },
                header: () => <span className='text-blue-800'>Acceptance</span>,
            }),
        ]
    }),
    columnHelper.accessor(row => row.currentStreak, {
        id: 'streaks',
        cell: info => info.getValue(),
        header: () => <span>Max Streak</span>,
    }),
    columnHelper.accessor(row => row.totalActiveDays, {
        id: 'activeDays',
        cell: info => info.getValue(),
        header: () => <span>Active Days</span>,
    }),
]
export default function Table() {
    const [data, setData] = useState<leetcoderes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true);
        getData().then((res) => {
            res.map((item) => {
                console.log(item.totalActiveDays
                )
            })
            setData(res);
            setLoading(false);
        })
    }, []);
    const [globalFilter, setGlobalFilter] = React.useState('')
    const [sorting, setSorting] = React.useState<SortingState>([])
    const rerender = React.useReducer(() => ({}), {})[1];
    const table = useReactTable({
        data,
        columns: defaultColumns,
        state: {
            sorting,
            globalFilter,

        },
        //getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <div className="overflow-x-auto w-full flex flex-col place-content-center ">
            <DebouncedInput
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                className="p-2 font-lg shadow border border-block"
                placeholder="Search all columns..."
            />
            <table className='table w-4/5 table-compact table-zebra m-auto'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            <th></th>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder
                                        ? null
                                        : (
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : '',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        ) }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                        <tr key={row.id} className="hover">
                            
                                <td>{index + 1}</td>
                                {row.getVisibleCells().map(cell => (
                                    <>
                                        <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    </>
                                ))}
                            </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
            {loading && <div className="flex flex-row justify-center">
                <div className="spinner"></div>
            </div>}
            <div className="h-4" />
            
        </div>
    )
}



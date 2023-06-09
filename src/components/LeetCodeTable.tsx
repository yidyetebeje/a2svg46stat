'use client';
import { leetcoderes } from '../interfaces/leetcoderes';
import { useState, useEffect, use } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, RowSelection, SortingState, useReactTable } from '@tanstack/react-table';
import React from 'react';

import { DebouncedInput } from './DebounceInput';
import { Stat } from './Stat';
import { LandingPage } from './LandingPage';
import { useRouter } from 'next/navigation';
export const dynamic = "force-dynamic";
async function getData(): Promise<leetcoderes[]>{
    const data = await fetch("/api", {
        cache: "no-store"
    });
    let res: {
        res: leetcoderes[];
    } = await data.json();
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
    const router = useRouter();
    const [data, setData] = useState<leetcoderes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [average, setAverage] = useState<leetcoderes>({} as leetcoderes);
    useEffect(() => {
        setLoading(true);
        getData().then((res) => {
            setData(res);
            setAverage(averageCalc(res));
            setLoading(false);
        })
    }, []);
    const averageCalc = (res:leetcoderes[]) => {
        let easy = 0;
        let medium = 0;
        let hard = 0;
        let total = 0;
        let totalsub = 0;
        let currentStreak = 0;
        let totalActiveDays = 0;
        res?.forEach((user) => {
            easy += user.easy || 0;
            medium += user.medium || 0;
            hard += user.hard || 0;
            total += user.total || 0;
            totalsub += user.totalsub || 0;
            currentStreak += user.currentStreak || 0;
            totalActiveDays += user.totalActiveDays || 0;
        })
        return {
            Name: "Average",
            easy: easy / res.length,
            medium: medium / res.length,
            hard: hard / res.length,
            total: total / res.length,
            totalsub: totalsub / res.length,
            currentStreak: currentStreak / res.length,
            totalActiveDays: totalActiveDays / res.length,
        }
    }
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
            <LandingPage>
                {loading ? "loading":
                    <Stat avg={average} />}
            </LandingPage>
           
            <DebouncedInput
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                className="p-2 font-lg shadow border border-block"
                placeholder="Search all columns..."
            />
            <h1 className="text-center text-2xl font-bold">Leetcode Stats</h1>
            {loading && <div className="flex flex-row justify-center">
                <div className="spinner"></div>
            </div>}
            {data &&
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
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                        <tr key={row.id} className="cursor-pointer hover" onClick={()=> router.push(`/UserDetail/${row.original.username}`)}> 
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
            </table>}
            
            <div className="h-4" />
            
        </div>
    )
}



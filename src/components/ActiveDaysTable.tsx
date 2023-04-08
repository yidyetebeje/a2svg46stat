'use client'
import { Cal, Res } from "@/app/api/users/route";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { useEffect, useState } from "react";
import Select from "./Select";


export default function ActiveDaysTable() {
    const [data, setData] = useState<Res[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const isInRange = (month: number, year: number, day: number) => {
        const date = new Date();
        const currentMonth = date.getMonth() + 1;
        const currentYear = date.getFullYear();
        const currentDay = date.getDate();
        if (year > currentYear) {
            return false;
        }
        if (year === currentYear && month > currentMonth) {
            return false;
        }
        if (year === currentYear && month === currentMonth && day > currentDay) {
            return false;
        }
        return true;
    }
    const monthOptions = [
        {
            value: "January",
            key: "01",
            abbr: "Jan",
        },
        {
            value: "February",
            key: "02",
            abbr: "Feb",
        },
        {
            value: "March",
            key: "03",
            abbr: "Mar",
        },
        {
            value: "April",
            key: "04",
            abbr: "Apr",
        },
        {
            value: "May",
            key: "05",
            abbr: "May",
        },
        {
            value: "June",
            key: "06",
            abbr: "Jun",
        },
        {
            value: "July",
            key: "07",
            abbr: "Jul",
        },
        {
            value: "August",
            key: "08",
            abbr: "Aug",
        },
        {
            value: "September",
            key: "09",
            abbr: "Sep",
        },
        {
            value: "October",
            key: "10",
            abbr: "Oct",
        },
        {
            value: "November",
            key: "11",
            abbr: "Nov",
        },
        {
            value: "December",
            key: "12",
            abbr: "Dec",
        },
    ];
    const yearOptions = [
        {
            value: "2021",
            key: "2021",
        },
        {
            value: "2022",
            key: "2022",
        },
        {
            value: "2023",
            key: "2023",
        }
    ];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const [month, setMonth] = useState(monthOptions[currentMonth].key);
    const [year, setYear] = useState(currentYear.toString());
    useEffect(() => {
        setLoading(true);
        setData([]);
        fetch(`/api/users?month=${parseInt(month) - 1}&year=${year}`)
            .then(res => res.json())
            .then(data => {
                setData(data.res);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            })
        setSortState(false);
        console.log(month, " ", year);
    }, [month, year])
    const totalActiveDays = (arr: Cal[]) => {
        return arr.reduce((acc, cur) => {
            if (cur.active) {
                return acc + 1;
            }
            return acc;
        }, 0);
    }
    
    
    const [sortState, setSortState] = useState(false);
    useEffect(() => {
        if (sortState) {
            const d = [...data];
            const sorted = d.sort((a, b) => {
                return totalActiveDays(b.activeDays) - totalActiveDays(a.activeDays);
            })
            setData(sorted);
        } else {
            const d = [...data];
            const sortedByName = d.sort((a, b) => {
                return a.user.localeCompare(b.user);
            })
            setData(sortedByName);
        }
    }, [sortState])
    
        
    return (
        <div className="w-full flex flex-col place-content-center">
            <div className="flex flex-row justify-center gap-4">
                <div className="flex flex-col">
                    <Select options={monthOptions} selected={month} onChange={setMonth} />
                </div>
                <div className="flex flex-col">
                    <Select options={yearOptions} selected={year} onChange={setYear} />
                </div>
                <div className="flex items-center">
                        <input checked={sortState} onClick={()=>setSortState(!sortState)} id="checked-checkbox" type="checkbox"  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sort</label>
                </div>
            </div>
            {loading && <div className="flex flex-row justify-center"> 
                <div className="spinner"></div>
                </div>}
            {data && <div className="flex flex-col place-content-center">
                <table className="table w-4/5 table-compact table-zebra m-auto">
                    <thead>
                        <tr>
                            <th>Username</th>
                            {data[0]?.activeDays.map((item, i) => {
                                return (
                                    <th key={i + 1}>{i + 1}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    {loading ? <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                 : 
                        <tbody>
                            {
                                data?.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.user}</td>
                                            {item.activeDays.map((day, j) => {
                                                return (
                                                    <td key={j}>
                                                        {
                                                            !isInRange(parseInt(month), parseInt(year), j + 1) ? "" :
                                                                day.active ? <div className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                                                                    <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                                                    <span className="sr-only">Check icon</span>
                                                                </div> : <div className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                                                    <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                                    <span className="sr-only">Error icon</span>
                                                                </div>

                                                        }
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        }
                   
                </table>
            </div>
        }
        
        </div>
    )
}


import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_CLIENTS } from '@/utils/queries';
import '../../styles/allClients.css';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function AllClients() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [readRows, setReadRows] = useState(new Set());

  const { loading, error, data } = useQuery(ALL_CLIENTS);

  useEffect(() => {
    // get the state from localStorage
    const savedReadRows = JSON.parse(localStorage.getItem('readRows')) || [];
    setReadRows(new Set(savedReadRows));
  }, []);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
    setReadRows(prev => {
      const newReadRows = new Set(prev);
      newReadRows.add(index);
      // save the state to localStorage
      localStorage.setItem('readRows', JSON.stringify(Array.from(newReadRows)));
      return newReadRows;
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.allClients) return <p>List of clients empty</p>;
  const clients = data.allClients;

  return (
    <Table className="custom-table md:w-5/6 sm:w-9/12	w-3/6 bg-blue-gray-50">
      <TableCaption className="font-bold text-lightSlate uppercase mt-8 text-center">A list of all clients.</TableCaption>
      <TableHeader>
        <TableRow className="text-lightSlate font-extrabold">
          <TableHead className="font-bold text-stone  sm:text-sm md:text-lg text-xs">Number</TableHead>
          <TableHead className="font-bold text-stone sm:text-sm md:text-lg text-xs">Name</TableHead>
          <TableHead className="font-bold text-stone sm:text-sm md:text-lg text-xs">Last Name</TableHead>
          <TableHead className="text-right font-bold text-stone sm:text-sm md:text-lg text-xs">Date</TableHead>
          <TableHead className="text-right font-bold text-stone sm:text-sm md:text-lg text-xs">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="sm:text-base lg:text-lg text-xs">
        {clients.map((client, index) => (
          <React.Fragment key={index}>
            <TableRow
              onClick={() => toggleRow(index)}
              style={{ cursor: 'pointer' }}
              // className={!readRows.has(index) ? 'unread' : ''}
            >
              <TableCell className={`${readRows.has(index) ? 'text-cyan font-bold' : 'text-stone'}`}>{index + 1}</TableCell>
              <TableCell className={readRows.has(index) ? 'text-cyan font-bold' : 'text-stone'}>{client.firstName}</TableCell>
              <TableCell className={readRows.has(index) ? 'text-cyan font-bold' : 'text-stone'}>{client.lastName}</TableCell>
              <TableCell className={`text-right ${readRows.has(index) ? 'text-cyan font-bold' : 'text-stone'}`}>{client.created_at}</TableCell>
              <TableCell className="text-center">🔽</TableCell>
            </TableRow>
            {expandedRow === index && (
              <TableRow>
                <TableCell colSpan="5">
                  <div className="flex flex-col bg-blue-gray-200 border border-gray-300 p-4 rounded shadow-md">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <p className="text-xs md:text-base">Email:</p>
                      <p className='text-xs md:text-base'>{client.email}</p>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <p className="text-xs md:text-base">Phone:</p>
                      <p className='text-xs md:text-base'>{client.phone}</p>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <p className="text-xs md:text-base">Inquiry:</p>
                      <p className='text-xs md:text-base'>{client.inquiry}</p>
                    </div>
                    <div className="flex justify-between py-2">
                      <p className="text-xs md:text-base">Message:</p>
                      <p className='text-xs md:text-base'>{client.message}</p>
                    </div>
                  </div>


                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}

export default AllClients;

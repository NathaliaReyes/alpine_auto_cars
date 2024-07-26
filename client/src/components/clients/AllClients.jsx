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
    <Table className="custom-table">
      <TableCaption>A list of all your clients.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Number</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Last name</TableHead>
          <TableHead className="text-right">Date</TableHead>
          <TableHead className="w-[50px]">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client, index) => (
          <React.Fragment key={index}>
            <TableRow
              onClick={() => toggleRow(index)}
              style={{ cursor: 'pointer' }}
              className={!readRows.has(index) ? 'unread' : ''}
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{client.firstName}</TableCell>
              <TableCell>{client.lastName}</TableCell>
              <TableCell className="text-right">{client.created_at}</TableCell>
              <TableCell className="text-center">🔽</TableCell>
            </TableRow>
            {expandedRow === index && (
              <TableRow>
                <TableCell colSpan="5">
                  <div className="flex flex-col bg-gray-100 border border-gray-300 p-4 rounded shadow-md">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <p className="font-medium">Email:</p>
                      <p >{client.email}</p>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <p className="font-medium">Phone:</p>
                      <p>{client.phone}</p>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <p className="font-medium">Inquiry:</p>
                      <p>{client.inquiry}</p>
                    </div>
                    <div className="flex justify-between py-2">
                      <p className="font-medium">Message:</p>
                      <p>{client.message}</p>
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

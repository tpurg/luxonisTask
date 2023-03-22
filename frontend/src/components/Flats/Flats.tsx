import { useEffect, useState } from "react";
import axios from "axios";
import { Flat } from "./Flat/Flat";
import Pagination from "@mui/material/Pagination/Pagination";
import "./flats.css";

export const Flats = () => {
  const [flats, setFlats] = useState([]);
  const [flatsPerPage, setFlatsPerPage] = useState(10);
  const [flatsPageNumber, setFlatsPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [viewPagination, setViewPagination] = useState(false);

  useEffect(() => {
    getFlats(flatsPerPage, flatsPageNumber);
  }, [flatsPerPage, flatsPageNumber]);

  useEffect(() => {
    getNumberOfPages();
  }, [flatsPerPage]);

  //this function gets flats to be listed
  const getFlats = async (flatsPerPage: number, flatsPageNumber: number) => {
    const flats = await axios.get(
      `http://localhost:8000/api/flats?limit=${flatsPerPage}&offset=${flatsPageNumber * flatsPerPage}`
    );

    setFlats(flats.data);
  };

  //this function calculates the number of pages to be listed
  const getNumberOfPages = async () => {
    setViewPagination(false);
    const flatsNumber = await axios.get(
      `http://localhost:8000/api/flatsNumber`
    );

    const numberOfPages = Math.ceil(flatsNumber.data / flatsPerPage);

    setNumberOfPages(numberOfPages);
    setViewPagination(true);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setFlatsPageNumber(value - 1);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<unknown>,
  ) => {
    const target = event.target as HTMLTextAreaElement;
    setFlatsPageNumber(0)
    setFlatsPerPage(parseInt(target.value))
  };

  return (
    <div className="flats">
      <div className="flatsSelect">
        <p>
          Items per page:
        </p>
      <select value={flatsPerPage} onChange={handleItemsPerPageChange}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      </div>
      <div>
        {flats.map((flat) => (
          <Flat flat={flat} />
        ))}
      </div>
      {viewPagination && (
        <Pagination
          count={numberOfPages}
          page={flatsPageNumber + 1}
          onChange={handlePageChange}
          shape="rounded"
        />
      )}
    </div>
  );
};

/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Paper from "@material-ui/core/Paper";
import React, { useRef, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";

import AdminUserScreenHeader from "../components/Headers/AdminUserScreenHeader";
import BooksManagementTable from "../components/BooksManagementTable";
import { useMyBooks } from "../hooks/useMyBooks";

const resultsPerPage = 10;

const MyBooks: React.FC = () => {
  const [pageTable, setPageTable] = useState(1);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  //   const [modalOpen, setModalOpen] = useState(false);

  const {
    data: bookData,
    isLoading,
    error,
  } = useMyBooks(pageTable, resultsPerPage);

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = (
      <Badge type="danger" className="text-center">
        Something went wrong! Please try again later.
      </Badge>
    );
  } else if (bookData) {
    content = (
      <div>
        {/* <div className="mb-2">
          <Button size="sm" color="primary" onClick={() => setModalOpen(true)}>
            Add User
          </Button>
        </div> */}
        <BooksManagementTable
          currentPage={pageTable}
          onPageChange={setPageTable}
          resultsPerPage={resultsPerPage}
          bookData={bookData.books}
          total={bookData.total}
        />
        {/* <AdminUserModal
          type="Create"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        /> */}
      </div>
    );
  }

  return (
    <>
      <AdminUserScreenHeader />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <div className="input-group-alternative input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-search"></i>
                        </span>
                      </div>
                      <input
                        ref={searchInputRef}
                        placeholder="Search user by name"
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                </Row>
              </CardHeader>
              <Paper className="overflow-auto px-4 pb-4">
                {/* <div className="mb-3">
                  <h4 style={{ display: 'inline' }}>Search Results</h4>
                </div> */}
                {content}
              </Paper>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyBooks;

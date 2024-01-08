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
import Paper from '@material-ui/core/Paper';
import qs from 'query-string';
import React, { useEffect, useState } from "react";
import { useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Card, CardHeader, Col, Container, Row
} from "reactstrap";
import ChemicalSearchResults from '../components/ChemicalSearchResults';
import Header from "../components/Headers/Header";
import { useChemicalSearch } from '../hooks/useChemicalSearch';
import { useQueryParams } from '../hooks/useQueryParams';
import { updateQueryParams } from '../utils/updateQueryParams';

const RESULTS_PER_PAGE = 10;

const Index: React.FC = () => {
  const query = useQueryParams()
  const [searchTerm, setSearchTerm] = useState(() => {
    const searchTerm = query.get('searchTerm')
    if (searchTerm) {
      return searchTerm
    }
    return ''
  })
  const [pageTable, setPageTable] = useState(() => {
    let page = +(query.get('page') || 0)
    if (isNaN(page) || page <= 0) {
      return 1
    }
    return page
  })
  const [showResults, setShowResults] = useState(false)
  const location = useLocation()
  const router = useHistory()

  const queryClient = useQueryClient()
  const { data, refetch, isLoading, isFetchedAfterMount, isError } = useChemicalSearch(searchTerm, pageTable, RESULTS_PER_PAGE)

  useEffect(() => {
    handleChemicalSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTable])

  useEffect(() => {
    if (isFetchedAfterMount) {
      setShowResults(true)
    }
  }, [isFetchedAfterMount])

  const handleChemicalSearch = async () => {
    if (!searchTerm || searchTerm.trim().length === 0) {
      return;
    }
    if (isLoading) {
      return
    }
    // remove previous company search results
    queryClient.removeQueries(["chemical", "search"])
    await refetch()
  }
  const handlePressEnter = () => {
    setPageTable(1)
    handleChemicalSearch()
    const q = qs.parse(location.search)
    q.searchTerm = searchTerm
    if (searchTerm.trim().length === 0) {
      delete q.searchTerm
    }
    // q.page = `${pageTable}`
    updateQueryParams(qs.stringify(q), router, location.pathname)
  }

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <div className="input-group-alternative input-group">
                      <div className="input-group-prepend">
                        <span onClick={handlePressEnter} className="input-group-text">
                          <i className="fas fa-search"></i>
                        </span>
                      </div>
                      <input
                        value={searchTerm}
                        onChange={e => {
                          setSearchTerm(e.target.value)
                        }}
                        onKeyDown={e => {
                          if (e.key.toLowerCase() === 'enter') {
                            handlePressEnter()
                          }
                        }}
                        placeholder="Search for any conference name"
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                </Row>
              </CardHeader>
              <Paper className="px-4 pb-4">
                {showResults ?
                  <ChemicalSearchResults data={data} isError={isError} isLoading={isLoading} pageTable={pageTable} setPageTable={setPageTable} resultsPerPage={RESULTS_PER_PAGE} />
                  :
                  <h4>Search anything...</h4>
                }
              </Paper>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;

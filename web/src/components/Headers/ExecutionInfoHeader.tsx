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

// reactstrap components
import React from "react";
import { Col, Container, Row } from "reactstrap";

const ExecutionInfoHeader: React.FC<{ id: string }> = ({ id }) => {
  let content: JSX.Element | null = null

  content = (
    <>
      <h2 className="display-2 text-white">Execution {id}</h2>
      {/* <p className="text-white mt-0 mb-3">
        This execution was run {DateTime.now().minus({ days: 1 }).toRelative()}.
      </p>
      <p className="text-white mt-0 mb-3">
        This execution took {secondsToTimeString(65)} to complete.
      </p> */}
      {/* <hr style={{ backgroundColor: 'white' }} className="mb-2" /> */}
      {/* <p className="text-white">
          This project is {data.data.status}.
        </p> */}
      {/* {
          !data.data.hasFollowUpInitiated &&
          <p className="text-white">
            Follow-up has not begun for this project.
          </p>
        }
        {
          data.data.replyStatus &&
          <p className="text-white">
            Pending Reply From {data.data.replyStatus === ProjectReplyStatus.opsTeam ? 'Operations' : 'Revenue'} Team.
          </p>
        }
        {
          schData &&
          <p className="text-white">
            Automatic reply scheduled for {DateTime.fromJSDate(new Date(schData.ts)).toLocaleString(DateTime.DATETIME_MED)} by {schData.userData.name}.
          </p>
        } */}
    </>
  )

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "500px",
          backgroundColor: '#2D315C',
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col>
              {content}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ExecutionInfoHeader;

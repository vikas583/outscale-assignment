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
import Avatar from "react-avatar";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import {
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  Navbar,
  UncontrolledDropdown,
} from "reactstrap";
// import { RouteItem } from "../../types";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const AdminNavbar: React.FC = () => {
  const { data } = useCurrentUser();
  // let headerText = 'Dashboard'
  // const { pathname } = useLocation()
  // if (pathname.includes('/project/')) {
  //   headerText = 'Project Details'
  // }
  // if (pathname === '/admin/monitor') {
  //   headerText = 'Monitor'
  // }
  // if (pathname === '/admin/scheduler') {
  //   headerText = 'Scheduler'
  // }
  const queryClient = useQueryClient();
  const router = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/auth/login");
    queryClient.clear();
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          {/* Brand */}
          <div className="text-center mb-0 pt-2 h3 text-white">
            {/* <br />
            <img alt="logo" src="/dir.jpg" width={100} /> */}
          </div>
          {/* Navigation */}
          {/* <Nav navbar>
            <Col>
              <div className="input-group-alternative input-group">
                <div className="input-group-prepend">
                  <span onClick={() => {}} className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    style={{ marginLeft: "-5px" }}
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={""}
                    onChange={(e) => {
                      // setSearchString(e.target.value)
                    }}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === "enter") {
                        // handleSearch()
                      }
                    }}
                  />
                </div>
              </div>
            </Col>
          </Nav> */}
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <Avatar
                    name={data?.name}
                    size="36"
                    className="avatar rounded-circle"
                  />
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {data?.name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome, {data?.name}!</h6>
                </DropdownItem>
                {/* <DropdownItem>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;

// <Container fluid>
//          <h4
//            className="h4 mb-0 text-white text-uppercase d-none d-md-inline-block"
//          >
//           {headerText}
//          </h4>
//          {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
//            <FormGroup className="mb-0">
//              <InputGroup className="input-group-alternative">
//                <InputGroupAddon addonType="prepend">
//                  <InputGroupText>
//                    <i className="fas fa-search" />
//                  </InputGroupText>
//                </InputGroupAddon>
//                <Input placeholder="Search for a project" type="text" />
//              </InputGroup>
//            </FormGroup>
//          </Form> */}
//          <Nav className="align-items-center d-none d-md-flex" navbar>
//            <UncontrolledDropdown nav>
//              <DropdownToggle className="pr-0" nav>
//                <Media className="align-items-center">
//                  <Avatar name={'Abhishek'} size="36" className="avatar rounded-circle" />
//                  <Media className="ml-2 d-none d-lg-block">
//                    <span className="mb-0 text-sm font-weight-bold">
//                      {'Abhishek'}
//                    </span>
//                  </Media>
//                </Media>
//              </DropdownToggle>
//              <DropdownMenu className="dropdown-menu-arrow" right>
//                <DropdownItem className="noti-title" header tag="div">
//                  <h6 className="text-overflow m-0">Welcome, {'Abhishek'}!</h6>
//                </DropdownItem>
//                {/* <DropdownItem>
//                  <i className="ni ni-single-02" />
//                  <span>My profile</span>
//                </DropdownItem>
//                <DropdownItem to="/admin/user-profile" tag={Link}>
//                  <i className="ni ni-settings-gear-65" />
//                  <span>Settings</span>
//                </DropdownItem>
//                <DropdownItem to="/admin/user-profile" tag={Link}>
//                  <i className="ni ni-calendar-grid-58" />
//                  <span>Activity</span>
//                </DropdownItem>
//                <DropdownItem to="/admin/user-profile" tag={Link}>
//                  <i className="ni ni-support-16" />
//                  <span>Support</span>
//                </DropdownItem> */}
//                <DropdownItem divider />
//                <DropdownItem onClick={handleLogout}>
//                  <i className="ni ni-user-run" />
//                  <span>Logout</span>
//                </DropdownItem>
//              </DropdownMenu>
//            </UncontrolledDropdown>
//          </Nav>
//        </Container>

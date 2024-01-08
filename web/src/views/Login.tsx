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

import { Formik } from "formik";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  FormText,
} from "reactstrap";
import Toastr from "toastr";
import { useLoginMutation } from "../hooks/useLoginMutation";

const Login = () => {
  const { mutate: login, isLoading } = useLoginMutation((err, msg) => {
    if (err) {
      Toastr.error(msg!);
    }
  });
  const handleLogin = async (data: { email: string; password: string }) => {
    if (isLoading) return;
    try {
      login({ email: data.email, password: data.password });
    } catch (error) {
      console.error(error);
      Toastr.error("Cannot login. Please try again later.");
    }
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors: Record<string, string | undefined> = {};
                const { email, password } = values;
                if (email.length <= 0) {
                  errors.email = "Email is required!";
                }
                if (password.length <= 0) {
                  errors.password = "Password is required!";
                }
                // console.log(errors);
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                handleLogin(values);
              }}
            >
              {({
                handleChange,
                handleBlur,
                submitForm,
                isSubmitting,
                values,
                errors,
              }) => (
                <>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={values.email}
                        valid={!errors.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && (
                        <FormText color="red">{errors.email}</FormText>
                      )}
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={values.password}
                        valid={!errors.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.password && (
                        <FormText color="red">{errors.password}</FormText>
                      )}
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={() => {
                        if (Object.keys(errors).length > 0 || isSubmitting)
                          return;

                        submitForm();
                      }}
                    >
                      Sign in
                    </Button>
                  </div>
                </>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;

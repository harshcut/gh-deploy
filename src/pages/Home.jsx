import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { OctofaceIcon, RepoIcon } from "@primer/octicons-react";
import { getDeploymentData } from "../utils/api";
import { UserContext } from "../utils/context";
import { Alert, DataTable } from "../components";
import {
  FormGroup,
  TextInput,
  Button,
  ButtonPrimary,
  Flex,
  Grid,
} from "@primer/components";

const Home = () => {
  const { register, handleSubmit, formState } = useForm();
  const [formStatus, setFormStatus] = useState(false);
  const [_context, setContext] = useContext(UserContext);

  const onSubmit = async ({ name, repo }) => {
    const { response, status } = await getDeploymentData(name, repo);
    if (status === 200) {
      setContext({ name, repo, response });
      return setFormStatus(200);
    }
    if (status === 403) return setFormStatus(403);
    return setFormStatus(404);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormGroup.Label htmlFor="username">GitHub Username</FormGroup.Label>
          <TextInput
            icon={OctofaceIcon}
            id="username"
            {...register("name", { required: true })}
          />
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="repository">
            Repository Name
          </FormGroup.Label>
          <TextInput
            icon={RepoIcon}
            id="repository"
            {...register("repo", { required: true })}
          />
        </FormGroup>
        <Flex justifyContent="flex-end" mb={3}>
          <Button mr={3} as="a" href="/">
            Reset
          </Button>
          <ButtonPrimary type="submit">Show Deployments</ButtonPrimary>
        </Flex>
      </form>
      <Grid gridGap={3}>
        {(formState.errors.name || formState.errors.repo) && (
          <Alert type="required" />
        )}
        {formStatus === 200 && <DataTable />}
        {formStatus === 404 && <Alert type="invalid" />}
        {formStatus === 403 && <Alert type="limit" />}
      </Grid>
    </>
  );
};

export default Home;

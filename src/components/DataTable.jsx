import React, { useContext, useState, useRef } from "react";
import Table from "react-data-table-component";
import { AlertIcon, KeyIcon, TrashcanIcon } from "@primer/octicons-react";
import { UserContext } from "../utils/context";
import { Alert, Status } from "../components";
import { setDeploymentInactive, deleteDeployment } from "../utils/api";
import {
  Dialog,
  Grid,
  Text,
  Flash,
  StyledOcticon,
  Box,
  Link,
  FormGroup,
  TextInput,
  ButtonDanger,
  Button,
  Avatar,
} from "@primer/components";

const DataTable = () => {
  const [formStatus, setFormStatus] = useState(false);
  const [context, setContext] = useContext(UserContext);
  const tokenRef = useRef(null);

  const columns = [
    {
      name: "Unique ID",
      selector: (row) => row["id"],
    },
    {
      name: "Timestamp",
      selector: (row) => row["created_at"],
    },
    {
      name: "Status",
      selector: (row) => row["statuses_url"],
      cell: (row) => <Status url={row.statuses_url} />,
    },
    {
      name: "Environment",
      selector: (row) => row["environment"],
    },
    {
      name: "Creator",
      selector: (row) => row["creator"],
      cell: (row) => (
        <>
          <Avatar src={row.creator["avatar_url"]} />
          <Text ml={2}>{row.creator["login"]}</Text>
        </>
      ),
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <Button onClick={() => onAction(row.id)}>
          <TrashcanIcon />
        </Button>
      ),
    },
  ];

  const onAction = (deploy) => {
    setFormStatus(true);
    setContext({ ...context, deploy });
  };

  const onSubmit = async () => {
    const token = tokenRef.current?.value;
    const { status } = await setDeploymentInactive(context, token);
    if (status !== 201) return setFormStatus("failed");
    const { status: _status_ } = await deleteDeployment(context, token);
    if (_status_ !== 204) return setFormStatus("failed");
    const filter = context.response.filter((deploy) => {
      return deploy.id !== context.deploy;
    });
    setContext({ ...context, response: filter });
    onDismiss();
  };

  const onDismiss = () => {
    setFormStatus(false);
    delete context["deploy"];
  };

  return (
    <>
      <Grid gridGap={3}>
        <Alert type="wait" />
        <Table pagination columns={columns} data={context.response} />
      </Grid>
      <Dialog
        isOpen={typeof formStatus === "string" || formStatus === true}
        onDismiss={onDismiss}
      >
        <Dialog.Header>
          <Text fontSize={1} fontWeight={600}>
            Are you sure you want to do this?
          </Text>
        </Dialog.Header>
        <Flash variant="danger" full>
          <StyledOcticon icon={AlertIcon} />
          <Text fontSize={1} ml={2}>
            This is extremely important.
          </Text>
        </Flash>
        <Box p={3} as="main">
          <Text as="p" fontSize={1} mt={0}>
            We will{" "}
            <Text fontWeight={600}>
              immediately delete your selected deployment
            </Text>
            , and will not be displayed on your repository.
          </Text>
          <Text as="p" fontSize={1}>
            You will not be able to recover your deployment. For more help, read
            article on "
            <Link
              href="https://docs.github.com/en/actions/reference/environments"
              target="_blank"
              rel="noopener"
            >
              GitHub Environments
            </Link>
            ".
          </Text>
          <FormGroup>
            <FormGroup.Label htmlFor="token">
              Personal Access Token
            </FormGroup.Label>
            <TextInput
              icon={KeyIcon}
              id="token"
              ref={tokenRef}
              onChange={(e) => {
                if (e.target.value) return setFormStatus("ready");
                setFormStatus(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && formStatus === "ready") {
                  void onSubmit();
                }
              }}
            />
            <small>
              How to get your{" "}
              <Link
                href="https://github.com/harshcut/gh-deploy#personal-access-token"
                target="_blank"
                rel="noopener"
              >
                <i>personal access token</i>
              </Link>
              ?
            </small>
          </FormGroup>
          <ButtonDanger
            onClick={onSubmit}
            disabled={formStatus !== "ready"}
            style={{ width: "100%" }}
          >
            Delete Your Deployment
          </ButtonDanger>
          {formStatus === "failed" && <Alert type="failed" mt={3} />}
        </Box>
      </Dialog>
    </>
  );
};

export default DataTable;

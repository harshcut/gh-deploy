import React from "react";
import { Flash, Text, Heading } from "@primer/components";

function Alert({ type, ...props }) {
  let text, variant;

  switch (type) {
    case "required":
      text = {
        head: "Required Field",
        body: "Some of the above required fields are left empty. Complete the form to continue.",
      };
      variant = "warning";
      break;
    case "invalid":
      text = {
        head: "Invalid Credentials",
        body: "Invalid Username or Repository. Make sure your repository is valid and made public. Still can't get deployments? Try again later or report an issue.",
      };
      variant = "danger";
      break;
    case "wait":
      text = {
        head: "Data Updates",
        body: "It may take some time for GitHub to update the API. Make sure to reload the data or refresh the page.",
      };
      break;
    case "limit":
      text = {
        head: "Rate Limit",
        body: "API rate limit exceeded for your IP address. You can make up to 5,000 requests per hour.",
      };
      variant = "warning";
      break;
    case "failed":
      text = {
        head: "Process Failed",
        body: "The personal access token used is invalid or this deployment is already deleted.",
      };
      variant = "danger";
      break;
    default:
      text = {
        head: "Required Field",
        body: "Some of the above required fields are left empty. Complete the form to continue.",
      };
      variant = "warning";
  }

  return (
    <Flash variant={variant} {...props}>
      <Heading fontSize={1}>{text.head}</Heading>
      <Text fontSize={1} as="p">
        {text.body}
      </Text>
    </Flash>
  );
}

export default Alert;

import {
  Button,
  Dropdown,
  Link,
  Navbar,
  Switch,
  Text,
} from "@nextui-org/react";
import React from "react";
import { ModalLogin } from "../modal";
import { icons } from "./icons";
import { AcmeLogo } from "./logo";
import { useTheme as useNextTheme } from "next-themes";
import { useTheme } from "@nextui-org/react";
import { Flex } from "../styles/flex";
import { GithubIcon } from "../icons/GithubIcon";

interface NavProps {
   pressRefresh: () => void;
 }

export const Nav: React.FC<NavProps> = ({ pressRefresh }) => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  return (
    <Navbar
      isBordered
      css={{
        display: "flex",
        justifyItems: "center",
        overflow: "hidden",
        "& .nextui-navbar-container": {
          background: "$background",
          borderBottom: "none",
        },
      }}
    >
      <Navbar.Brand>
        <Text
          h1
          size={40}
          css={{
            textGradient:
              "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%",
          }}
          weight="bold"
        >
          Chat C Hat
        </Text>
      </Navbar.Brand>

      <Navbar.Content>
        <Flex
          css={{
            gap: "$10",
          }}
          justify="center"
          wrap={"wrap"}
        >
          <Button size="xs" onPress={() => pressRefresh()}>
            Clean
          </Button>
        </Flex>
        <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        />
      </Navbar.Content>
    </Navbar>
  );
};

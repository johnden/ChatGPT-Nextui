import { Button, Divider, Text, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { AcmeLogo } from "../navbar/logo";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { SendIcon } from "../icons/SendIcon";

export const Footer = ({ pressSend, outputMsg, isLoading }) => {
  const [msg, setMsg] = useState("");
  const handleChange = (event) => {
    // get input value from event.target.value and update state with setValue function
    setMsg(event.target.value);
  };

  return (
    <Flex
      css={{
        py: "$10",
        px: "$6",
        bottom: 0,
        left: 0,
        right: 0,
        position: "fixed",
      }}
    >
      <Box as={"footer"} css={{ width: "100%" }}>
        <Box
          css={{
            // px: "$10",
            "@md": {
              px: "$56",
            },
          }}
        >
          <Divider
            css={{
              //   mt: "$14",
              display: "flex",
              justifyContent: "center",
            }}
          />
          <Flex
            //   justify={'between'}
            align={"center"}
            wrap={"wrap"}
            css={{
              pt: "$8",
              gap: "$10",
              justifyContent: "center",
              "@md": {
                justifyContent: "space-between",
              },
            }}
          >
            <Input
              fullWidth
              disabled={isLoading}
              value={msg}
              placeholder="Say something!"
              contentRight={
                <Button
                  auto
                  disabled={isLoading}
                  onPress={() => {
                     if(msg.length===0){
                        return;
                     }

                    setMsg("");
                    pressSend(msg);
                  }}
                  css={{paddingRight:'$5', paddingLeft:'$5'}}
                  icon={<SendIcon/>}
                />
                  
              }
              onChange={(e) => handleChange(e)}
            />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

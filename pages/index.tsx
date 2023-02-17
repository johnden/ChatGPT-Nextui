import type { NextPage } from "next";
import { Card, Row, Col, Text, Loading } from "@nextui-org/react";
import { Nav } from "../components/navbar/navbar";
import { Layout } from "../components/navbar/layout";
import { Hero } from "../components/hero";
import { Trusted } from "../components/trusted";
import { Box } from "../components/styles/box";
import { Flex } from "../components/styles/flex";
import { Footer } from "../components/footer";
import { useState, useEffect } from "react";
import { ChatGPTAPI } from "chatgpt";
import axios from "axios";
// import dotenv from 'dotenv-safe'
// dotenv.config()

const Home: NextPage = () => {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [conversationID, setConversationID] = useState("");
  const [messages, setMessages] = useState([]);

  const refresh = () => {
    setIndex(0);
    setConversationID("");
    setId("");
    setMessages([]);
    console.log("refreshed");
  };

  const sendMessage = (msg) => {
    console.log(msg);
    var tempMessages = messages;
    tempMessages.push({
      isSelf: true,
      message: msg,
    });
    setMessages(tempMessages);
    setLoading(true);
    getChatWithGPT(msg);
    console.log("sent");
  };

  const getChatWithGPT = (msg: string) => {
    axios
      .post("http://198.11.172.174:80/chat", {
        message: msg,
        parentMessageId: id,
        conversationId: conversationID,
      })
      .then((res) => {
        console.log(res);
        var tempMessages = messages;
        tempMessages.push({
          isSelf: false,
          message: res.data.message,
        });
        setMessages(tempMessages);
        setLoading(false);
        setId(res.data.id);
        setConversationID(res.data.conversationId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);
  return (
    <Layout>
      <Nav pressRefresh={refresh} />
      <Flex as="main" justify="between" direction="column">
        <Flex direction={"column"}>
          {messages.map((item) => {
            if (item.isSelf === true) {
              return (
                <Flex justify="end" css={{ gap: "$10", padding: "$5" }}>
                  <Card
                    isPressable
                    isHoverable
                    css={{
                      $$cardColor: "$colors$primary",
                      display: "flex",
                    }}
                  >
                    <Card.Body>
                      <Row justify="flex-end" align="center">
                        <Text h6 size={15} color="white" css={{ m: 0 }}>
                          {item.message}
                        </Text>
                      </Row>
                    </Card.Body>
                  </Card>
                </Flex>
              );
            } else {
              return (
                <Flex justify="end" css={{ gap: "$10", padding: "$5" }}>
                  <Card
                    isPressable
                    isHoverable
                    css={{
                      $$cardColor: "$colors$gradient",
                      display: "flex",
                    }}
                  >
                    <Card.Body>
                      <Row justify="flex-start" align="center">
                        <Text h6 size={15} color="white" css={{ m: 0 }}>
                          {item.message}
                        </Text>
                      </Row>
                    </Card.Body>
                  </Card>
                </Flex>
              );
            }
            
            <Flex justify="end" css={{ display:loading?"flex":"none", gap: "$10", padding: "$5" }}>
              <Card

                    css={{
                      $$cardColor: "$colors$gradient",
                      display: "flex",
                    }}
                  >
                    <Card.Body>
                      <Row justify="flex-start" align="center">
                        <Loading type="points" />
                      </Row>
                    </Card.Body>
                  </Card>
             </Flex>
          })}
        </Flex>

        <Footer pressSend={(msg) => sendMessage(msg)} isLoading={loading} />
      </Flex>
    </Layout>
  );
};

export default Home;

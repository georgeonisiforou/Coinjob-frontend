import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid grey;
  padding: 0.5rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FieldContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
`;

const Field = styled.input`
  width: 200px;
  height: 40px;
  padding: 1rem;
`;

const SubmitBtn = styled.button`
  width: 70px;
  height: 40px;
`;

const Cronjob = () => {
  const fetchData = async () => {
    const results = await axios
      .get("/api/getAllPrices")
      .then((res) => res.data);

    setData(results);
  };

  const startCronjob = async () => {
    const results = await axios
      .get("/api/startCronjob")
      .then((res) => res.data);

    setData(results);
  };

  const forceStart = async () => {
    const results = await axios.get("/api/forceStart").then((res) => res.data);

    setData(results);
    fetchData();
  };

  const stopCronjob = async () => {
    const results = await axios.get("/api/stopCronjob").then((res) => res.data);

    setData(results);
  };

  const createCustomSchedule = async (custom) => {
    const results = await axios
      .post("/api/customSchedule", custom)
      .then((res) => res.data);

    setData(results);
  };

  const [data, setData] = useState(null);
  const [customSchedule, setCustomSchedule] = useState({
    second: "",
    minute: "",
    hour: "",
    day: "",
    month: "",
    weekday: "",
  });

  console.log(customSchedule);

  // useEffect(() => {
  //   fetchData();
  // }, [data]);

  return (
    <>
      <Container>
        <FormContainer>
          <FieldContainer>
            Second:
            <Field
              placeholder="Type here..."
              onChange={(e) =>
                setCustomSchedule({ ...customSchedule, second: e.target.value })
              }
            />
          </FieldContainer>
          <FieldContainer>
            Minute:
            <Field
              placeholder="Type here..."
              onChange={(e) =>
                setCustomSchedule({ ...customSchedule, minute: e.target.value })
              }
            />
          </FieldContainer>
          <FieldContainer>
            Hour:
            <Field
              placeholder="Type here..."
              onChange={(e) =>
                setCustomSchedule({ ...customSchedule, hour: e.target.value })
              }
            />
          </FieldContainer>
          <FieldContainer>
            Day:
            <Field
              placeholder="Type here..."
              onChange={(e) =>
                setCustomSchedule({ ...customSchedule, day: e.target.value })
              }
            />
          </FieldContainer>
          <FieldContainer>
            Month:
            <Field
              placeholder="Type here..."
              onChange={(e) =>
                setCustomSchedule({ ...customSchedule, month: e.target.value })
              }
            />
          </FieldContainer>
          <FieldContainer>
            Weekday:
            <Field
              placeholder="Type here..."
              onChange={(e) =>
                setCustomSchedule({
                  ...customSchedule,
                  weekday: e.target.value,
                })
              }
            />
          </FieldContainer>
          <FieldContainer>
            <SubmitBtn onClick={() => createCustomSchedule(customSchedule)}>
              SET
            </SubmitBtn>
            <SubmitBtn onClick={() => startCronjob()}>START</SubmitBtn>
            <SubmitBtn onClick={() => stopCronjob()}>STOP</SubmitBtn>
            <SubmitBtn onClick={() => forceStart()}>FORCE START</SubmitBtn>
            <SubmitBtn onClick={() => fetchData()}>GET</SubmitBtn>
          </FieldContainer>
        </FormContainer>
        {data && (
          <ResultsContainer>
            {data.map((item, idx) => {
              return (
                <Result key={idx}>
                  <p>Bitcoin: {item.prices.bitcoin.usd}</p>
                  <p>Ethereum: {item.prices.ethereum.usd}</p>
                  <p>Tether: {item.prices.tether.usd}</p>
                  <p>Time of price: {item.timeStamp}</p>
                </Result>
              );
            })}
          </ResultsContainer>
        )}
      </Container>
    </>
  );
};

export default Cronjob;

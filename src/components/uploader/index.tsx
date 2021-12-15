import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { DataStore } from "aws-amplify";
import React from "react";
import csv from "csvtojson";
import { ROI } from "../../models";
import { getUserName } from "../../utils/userInfo";
import { originalColumnToType } from "../../data/types";
import { uniqueId } from "../../utils/dataHelpers";

const convertData = (d: ROI) =>
  Object.fromEntries(
    Object.entries(d).map(([k, v]) => [
      (originalColumnToType as any)[k],
      v || undefined,
    ])
  );
const convertNumData = (d: ROI) =>
  Object.fromEntries(
    Object.entries(d)
      .map(([k, v]) => [
        (originalColumnToType as any)[k],
        parseFloat(v) ?? undefined,
      ])
      .filter((v) => !!v[1] || v[1] === 0)
  );

const Uploader = () => {
  const [csvString, setCSVString] = React.useState("");
  const [items, setItems] = React.useState<ROI[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState<string[]>([]);

  React.useEffect(() => {
    setLoaded(items.map((v) => "not"));
  }, [items]);

  const handleConverToJSON = async () => {
    setLoading(true);
    const i = await csv().fromString(csvString);
    setItems(
      i.map((v) => {
        const s = convertData(v);
        const n = convertNumData(v);
        return {
          ...s,
          ...n,
          percentageIncreaseInLifetimeEarnings:
            s.percentageIncreaseInLifetimeEarnings,
        };
      })
    );
    setLoading(false);
  };

  const startUpload = async () => {
    setLoading(true);
    for (let i = 0; i < items.length; i++) {
      try {
        await DataStore.save(new ROI(items[i]));
        loaded[i] = "true";
        setLoaded(loaded);
      } catch (e) {
        console.warn(`Item didn't load ${uniqueId(items[i])}`, items[i], e);
        loaded[i] = "false";
        setLoaded(loaded);
      }
    }
    setLoading(false);
  };

  if (getUserName() !== "nestler+grad@berkeley.edu") {
    return null;
  }

  return (
    <>
      <TextField
        multiline
        onChange={(e) => setCSVString(e.target.value)}
        style={{ width: "90vw" }}
        maxRows={15}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConverToJSON}
          >
            Convert To JSON
          </Button>
          <Button onClick={startUpload}>Start Upload</Button>
        </>
      )}
      <Box maxWidth="90vw" overflow="scroll">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{"loaded"}</TableCell>
              {Object.keys(items[0] || {}).map((h) => (
                <TableCell key={h}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((r, k) => (
              <TableRow key={uniqueId(r)}>
                <TableCell>{loaded[k] || "not"}</TableCell>
                {Object.entries(r).map((c) => (
                  <TableCell key={`${uniqueId(r)}${c[0]}`}>{c[1]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default Uploader;

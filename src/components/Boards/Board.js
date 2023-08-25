import React, { useState } from "react";
import { IconButton, TextField } from "@material-ui/core";
import { BoardTitle, Actions, BoardCard } from "./styled";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import { deleteBoard, editBoardName } from "../../axiosRequests/board";
import {
  Close,
  CloudDownloadOutlined
} from "@material-ui/icons";
import moment from "moment";
import "moment/locale/ru";
import axios from "axios";

moment.locale("ru");
export const Board = ({ board, getBoards }) => {
  const [edit, setEdit] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const download = function(data) {
    const blob = new Blob([data], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.setAttribute("href", url);
    a.setAttribute("download", "download.csv");
    a.click();
  };
  const downloadCsv = async () => {
    const { data } = await axios.get(`/api/createCsv/${board._id}`);
    download(data);
  };

  return (
    <BoardCard>
      {!edit ? (
        <>
          <BoardTitle to={`/board/${board._id}`}>
            Название доски: {board.name} <br />
            <br />
            Дата создания:
            {moment(board.createTime)
              .lang("ru")
              .startOf()
              .fromNow()}
            <br />
            <br /> Количество задач: {board.tasksCount}
          </BoardTitle>
          <Actions>
            <IconButton
              onClick={() => {
                setEdit(true);
                setNewBoardName("");
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
            <IconButton
              onClick={() => {
                deleteBoard(board._id).then(({ data }) => {
                  getBoards();
                  alert(data.message);
                });
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
            <IconButton onClick={downloadCsv}>
              <CloudDownloadOutlined color="error" />
            </IconButton>
          </Actions>
        </>
      ) : (
        <>
          <TextField
            variant="outlined"
            placeholder="Введите новое имя"
            onChange={e => {
              setNewBoardName(e.target.value);
            }}
          />
          <IconButton
            onClick={() => {
              setEdit(false);
            }}
          >
            <Close color="error" />
          </IconButton>
          <IconButton
            onClick={() => {
              if (newBoardName === "") return;
              editBoardName(board._id, newBoardName).then(({ data }) => {
                setEdit(false);
                getBoards();
                alert(data.message);
              });
            }}
          >
            <DoneIcon color="primary" />
          </IconButton>
        </>
      )}
    </BoardCard>
  );
};

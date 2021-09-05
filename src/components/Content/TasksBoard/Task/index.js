import React, { useState } from "react";
import { TaskContainer, TaskName } from "./styled";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  TextField
} from "@material-ui/core";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { editTaskName, editTaskStatus } from "../../../../axiosRequests/task";

export const Task = ({ background, task, getBoard }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState();

  const handleClick = () => {
    setOpen(!open);
  };
  const editTask = () => {
    setEditMode(true);
  };
  return (
    <TaskContainer background={background}>
      {!editMode ? (
        <TaskName>{task.name}</TaskName>
      ) : (
        <>
          <TextField
            placeholder="Введите новое имя"
            onChange={e => {
              setNewName(e.target.value);
            }}
          />{" "}
          <IconButton
            onClick={() => {
              editTaskName(task._id, newName).then(() => {
                setEditMode(false);
                getBoard();
              });
            }}
          >
            {" "}
            <DoneIcon />
          </IconButton>
        </>
      )}

      {!editMode && (
        <PopupState variant="popper">
          {popupState => (
            <div>
              <IconButton {...bindTrigger(popupState)}>
                <MoreVertIcon />
              </IconButton>

              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
              >
                <List disablePadding>
                  <ListItem alignItems="center" button onClick={editTask}>
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    Редактировать
                  </ListItem>
                  <ListItem button onClick={handleClick}>
                    <ListItemText>Изменить статус</ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {task.status !== 0 && (
                        <ListItem
                          button
                          onClick={() => {
                            editTaskStatus(task._id, 0).then(e => {
                              getBoard();
                            });
                          }}
                        >
                          В надо сделать
                        </ListItem>
                      )}
                      {task.status !== 1 && (
                        <ListItem
                          button
                          onClick={() => {
                            editTaskStatus(task._id, 1).then(e => {
                              getBoard();
                            });
                          }}
                        >
                          Взять в работу
                        </ListItem>
                      )}
                      {task.status !== 2 && (
                        <ListItem
                          button
                          onClick={() => {
                            editTaskStatus(task._id, 2).then(e => {
                              getBoard();
                            });
                          }}
                        >
                          Перевести в готово
                        </ListItem>
                      )}
                      {task.status !== 3 && (
                        <ListItem
                          button
                          onClick={() => {
                            editTaskStatus(task._id, 3).then(e => {
                              getBoard();
                            });
                          }}
                        >
                          <ListItemIcon>
                            <DeleteIcon />
                          </ListItemIcon>
                          В корзину
                        </ListItem>
                      )}
                    </List>
                  </Collapse>
                </List>
              </Popover>
            </div>
          )}
        </PopupState>
      )}
    </TaskContainer>
  );
};

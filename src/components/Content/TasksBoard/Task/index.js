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
  Menu,
  MenuItem,
  Popover,
  TextField
} from "@material-ui/core";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import { Close, ExpandLess, ExpandMore } from "@material-ui/icons";
import {
  deleteTask,
  editTaskName,
  editTaskStatus
} from "../../../../axiosRequests/task";

export const Task = ({ background, task, getBoard }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            variant="outlined"
            placeholder="Введите новое имя"
            onChange={e => {
              setNewName(e.target.value);
            }}
          />
          <IconButton
            onClick={() => {
              setEditMode(false);
            }}
          >
            <Close color="error" />
          </IconButton>
          <IconButton
            onClick={() => {
              if (newName === "") return;
              editTaskName(task._id, newName).then(() => {
                setEditMode(false);
                getBoard();
              });
            }}
          >
            <DoneIcon color="primary" />
          </IconButton>
        </>
      )}
      {!editMode && (
        <div>
          <IconButton onClick={handleMenu} color="inherit">
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                editTask();
                handleClose();
              }}
            >
              <IconButton>
                <EditIcon color="primary" />
              </IconButton>
              Редактировать
            </MenuItem>
            <MenuItem
              onClick={() => {
                deleteTask(task._id).then(() => {
                  getBoard();
                  handleClose();
                });
              }}
            >
              <IconButton>
                <DeleteIcon color="error" />
              </IconButton>
              Удалить
            </MenuItem>
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
                        handleClose();
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
                        handleClose();
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
                        handleClose();
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
                        handleClose();
                      });
                    }}
                  >
                    В корзину
                  </ListItem>
                )}
              </List>
            </Collapse>
          </Menu>
        </div>
      )}
    </TaskContainer>
  );
};

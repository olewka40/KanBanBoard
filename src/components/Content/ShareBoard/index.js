import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Popover, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export const ShareBoard = ({ boardId, usersCanEdit, getBoard }) => {
  const { user } = useContext(UserContext);
  const [optionsArray, setOptionArray] = useState(usersCanEdit);
  const [usersIdWhoCanEditArray, setCanEditUsers] = useState(usersCanEdit);
  const getAllUsers = async () => {
    const { data } = await axios.get(`api/getAllUsers`);
    setOptionArray(data.filter(u => u.id !== user._id));
  };
  const saveChanges = async () => {
    await axios
      .put(`api/editBoardAccess`, {
        boardId,
        usersIdWhoCanEditArray
      })
      .then(({ data }) => {
        getBoard();
      });
  };
  useEffect(() => {
    user && getAllUsers();
  }, [user]);
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {popupState => (
        <div>
          <Button
            style={{ marginRight: 10, marginLeft: 10 }}
            variant="outlined"
            color="primary"
            {...bindTrigger(popupState)}
          >
            Поделиться доской
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <Box p={2} style={{ width: 400 }}>
              <Autocomplete
                multiple
                options={optionsArray}
                getOptionLabel={option => option.login}
                filterSelectedOptions
                defaultValue={usersCanEdit ? usersCanEdit : []}
                onChange={(e, value) => {
                  setCanEditUsers(value);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Кто может редактировать доску"
                    placeholder="Кто может редактировать доску"
                  />
                )}
              />
              <Button
                style={{ marginTop: 10 }}
                fullWidth
                variant="outlined"
                color="primary"
                onClick={saveChanges}
              >
                Применить
              </Button>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

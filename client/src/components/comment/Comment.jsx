import React from "react";
import { IconButton, Menu, MenuItem, Avatar as MuiAvatar } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const Comment = ({ comment, userId, handleDeleteComment }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    handleDeleteComment(comment?._id);
  };

  return (
    <div className="border-2 border-gray-200 rounded-xl flex gap-4 p-2 lg:ml-24 items-center">
      {/* Commented user details */}
      <MuiAvatar
        alt={comment?.user?.name}
        src={comment?.user?.profilePicture}
        sx={{ width: 30, height: 30 }}
        className="border-2"
      />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between flex-col sm:flex-row items-center">
          <h4 className="font-bold text-lg">{comment?.user?.name}</h4>
        </div>
        {/* Comment content */}
        <div className="flex justify-between">
          <p>{comment?.comment}</p>
          {comment?.user?._id === userId && (
            <>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                size="small"
                onClick={handleClick}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;

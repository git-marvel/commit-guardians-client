import PropTypes from "prop-types";
import React from "react";
import InfoIcon from "../../../shared/components/InfoIcon";
import { INFO_MESSAGES } from "../constants";

const InfoValue = ({ type }) => {
  const messages = INFO_MESSAGES[type];

  return (
    <span className="group">
      <InfoIcon />
      <span className="absolute left-20 top-3 hidden flex-col rounded-md border border-blue-400 bg-slate-800 px-3 py-1 text-white transition duration-300 ease-in-out group-hover:flex">
        {messages.map((message) => (
          <React.Fragment key={message.title}>
            <span className="mb-1 text-sm font-semibold">{message.title}</span>
            <span className="mb-2 text-xs">{message.contents}</span>
          </React.Fragment>
        ))}
      </span>
    </span>
  );
};

InfoValue.propTypes = {
  type: PropTypes.string.isRequired,
};

export default InfoValue;

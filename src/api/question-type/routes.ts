import * as express from "express";
import * as bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import pool from "../../database/pool";
const cors = require("cors");

export const QUESTION_TYPE_TABLE = "question_types";

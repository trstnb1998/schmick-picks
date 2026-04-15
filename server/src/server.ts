import http from "node:http";
import { URL } from "node:url";
import { v4 } from "uuid";

type SchmickPicksDatabase = {
	eventId?: string;
	eventName: string;
	prediction: string;
	status?: string;
	createdAt?: string;
};

type SchmickPicksDataRequest = {
	picks: {
		eventName: string;
		prediction: string;
	}[];
};

const newDate = new Date().toISOString();

export const defaultPicks: SchmickPicksDatabase[] = [
	{
		eventId: "48323036-aa18-439b-948f-d0f83db124ae",
		eventName: "Lions vs Dogs",
		prediction: "",
		status: "pending",
		createdAt: newDate,
	},
	{
		eventId: "f2211bc3-e5a1-49b3-8116-f1d81662d92e",
		eventName: "Dogs vs Cats",
		prediction: "",
		status: "pending",
		createdAt: newDate,
	},
	{
		eventId: "b734875e-687b-41f9-9ba6-af632f47cb2b",
		eventName: "Cats vs Rats",
		prediction: "",
		status: "pending",
		createdAt: newDate,
	},
	{
		eventId: "37088c1c-f543-4d99-928b-16fd1845bd5e",
		eventName: "Goats vs Sheep",
		prediction: "",
		status: "pending",
		createdAt: newDate,
	},
	{
		eventId: "895717e9-abf3-4e89-9d03-94ed14d7e73e",
		eventName: "Cows vs Pigs",
		prediction: "",
		status: "pending",
		createdAt: newDate,
	},
];

const schmickPicksDatabase: SchmickPicksDatabase[] = [...defaultPicks];

const server = http.createServer(
	(req: http.IncomingMessage, res: http.ServerResponse) => {
		const parsedUrl = new URL(req.url as string, `http://${req.headers.host}`);
		const pathname = parsedUrl.pathname;
		const query = parsedUrl.searchParams;
		const id = pathname.match(/\/picks\/([\w-]+)/)?.[1];

		const sendJSON = (
			res: http.ServerResponse,
			status: number,
			data: unknown,
		) => {
			res.statusCode = status;
			res.setHeader("Content-Type", "application/json");
			res.end(JSON.stringify(data));
		};

		const handleSummary = (res: http.ServerResponse) => {
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.end("Pick Ems Summary");
		};

		const handlePicks = (
			req: http.IncomingMessage,
			res: http.ServerResponse,
		) => {
			if (req.method === "GET") {
				const statusFilter = query.get("status");
				const result = statusFilter
					? schmickPicksDatabase.filter((pick) => pick.status === statusFilter)
					: schmickPicksDatabase;
				sendJSON(res, 200, result);
				return;
			} else if (req.method === "POST") {
				let body = "";

				req.on("data", (chunk) => {
					body += chunk.toString();
					console.log(chunk);
				});
				req.on("end", () => {
					const pickReqData: SchmickPicksDataRequest = JSON.parse(body);
					pickReqData.picks.forEach((pickData) => {
						schmickPicksDatabase.push({
							eventId: v4(),
							eventName: pickData.eventName,
							prediction: "",
							status: "pending",
							createdAt: newDate,
						});
					});
					sendJSON(res, 201, {
						message: "Picks Created Successfully",
						data: schmickPicksDatabase,
					});
					console.log("Updated schmickPicksDatabase:", schmickPicksDatabase);
				});
				return;
			}
			sendJSON(res, 405, { error: "Method not allowed" });
		};

		const handlePicksById = (
			req: http.IncomingMessage,
			res: http.ServerResponse,
		) => {
			if (req.method === "GET") {
				const pick = schmickPicksDatabase.find((pick) => pick.eventId === id);

				if (!pick) {
					sendJSON(res, 404, { error: "Pick not found" });
					return;
				}
				sendJSON(res, 200, pick);
			}

			if (req.method === "PATCH") {
				let body = "";

				req.on("data", (chunk) => {
					body += chunk.toString();
				});

				req.on("end", () => {
					const pick = schmickPicksDatabase.find((pick) => pick.eventId === id);
					if (!pick) {
						sendJSON(res, 404, { error: "Pick not found" });
						return;
					}

					const data = JSON.parse(body);
					pick.prediction = data.prediction || pick.prediction;
					pick.status = data.prediction
						? Math.random() < 0.5
							? "won"
							: "lost"
						: pick.status;

					const updatedPicks = schmickPicksDatabase.map((p) => {
						if (p.eventId === id) {
							return pick;
						}
						return p;
					});
					schmickPicksDatabase.splice(
						0,
						schmickPicksDatabase.length,
						...updatedPicks,
					);

					sendJSON(res, 200, pick);
				});
				return;
			}

			if (req.method === "DELETE") {
				const index = schmickPicksDatabase.findIndex(
					(pick) => pick.eventId === id,
				);
				if (index === -1) {
					sendJSON(res, 404, { error: "Pick not found" });
					return;
				}

				schmickPicksDatabase.splice(index, 1);
				sendJSON(res, 200, { message: "Pick deleted successfully" });
			}
		};

		switch (pathname) {
			case "/":
			case "/picks":
				handlePicks(req, res);
				break;
			case `/picks/${id}`:
				handlePicksById(req, res);
				break;
			case "/summary":
				handleSummary(res);
				break;
			default:
				sendJSON(res, 404, { error: "Route not found" });
		}
	},
);

const port = 3000;

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});

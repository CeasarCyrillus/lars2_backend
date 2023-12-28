"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeReportDto4 = exports.fakeReportDto3 = exports.fakeReportDto2 = exports.fakeReportDto1 = exports.team = exports.user = void 0;
exports.user = {
    id: 0,
    name: "Ceasar Cyrillus",
    email: "email@hotmail.com"
};
exports.team = {
    id: 0,
    association: 0,
    contacts: [],
    mainContact: {
        email: "email@email.com",
        name: "Henrik Tylenius",
        phone: "+93-12991291"
    },
    name: "Leksands IF",
    reports: [],
    specialAssociation: undefined,
    created: new Date()
};
exports.fakeReportDto1 = {
    created: new Date(),
    period: new Date("2023-08"),
    reporter: { email: "henkan@email.com", name: "Henrik Jurelius", phone: "01992-1292992" },
    revision: "A",
    status: "not-started",
    teamName: "Team IF Fotboll",
};
exports.fakeReportDto2 = {
    created: new Date("2023-08-11"),
    period: new Date("2023-08"),
    reporter: { email: "ceasar@email.com", name: "Ceasar Cyrillus", phone: "073 232 46 21" },
    revision: "",
    status: "in-progress",
    teamName: "Team IF Fotboll",
};
exports.fakeReportDto3 = {
    created: new Date("2023-08-11"),
    period: new Date("2023-08"),
    reporter: { email: "ceasar@email.com", name: "Ceasar Cyrillus", phone: "073 232 46 21" },
    revision: "",
    status: "approved",
    teamName: "Team IF Fotboll",
};
exports.fakeReportDto4 = {
    created: new Date("2023-08-11"),
    period: new Date("2023-08"),
    reporter: { email: "ceasar@email.com", name: "Ceasar Cyrillus", phone: "073 232 46 21" },
    revision: "",
    status: "past-deadline",
    teamName: "Team IF Fotboll",
};
//# sourceMappingURL=fakeData.js.map
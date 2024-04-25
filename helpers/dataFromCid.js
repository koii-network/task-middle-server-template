//IMPORTS
require("dotenv").config();
const axios = require("axios");
const { Web3Storage } = require("web3.storage");

const WEB3_GET_STORAGE_KEYS = [
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI4MTAzNzc2NTAsIm5hbWUiOiJzdG9yYWdlIn0.mqbNV7KyoB-9U5wWRsbnBsBk_HjD-Wg15DST0Q2nlSc",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5MTQ3OTg2MTcsIm5hbWUiOiJzdG9yYWdlMiJ9.FZtshdGS8Gy0NauDhoAoHDSp3ERxlnbfsdyV3nGJUqc",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5MTUxOTgwOTcsIm5hbWUiOiJzdG9yYWdlMyJ9.tHJsb3Tad4V3nWo1DVxkx0grRwM8puwDDw_d9BYYHvs",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5MTUyMTExMTAsIm5hbWUiOiJzdG9yYWdlNCJ9.DVpaSNvsRFKrcLvbnmkWCoNgHDrd_giyaYnvbr2jGv8",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5MTUyMzA2NTgsIm5hbWUiOiJzdG9yYWdlNSJ9.Vn7kfO3EMT44gR5VeFAL4D3LnysvoLrqHRnEm-Qqmws",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5MTUyNDExODUsIm5hbWUiOiJzdG9yYWdlNiJ9.jhN8VD8-0uSXieVBiWoOjUJyGszqeUc7QbqjgKuGRSo",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5MTUyNDQ4NjYsIm5hbWUiOiJzdG9yYWdlNyJ9.rbML6aFX2zqOtpFHdHm_VnlT1WqELvbEVfctpkdW41c",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5MTUyNDgxMzAsIm5hbWUiOiJzdG9yYWdlOCJ9.NHljrhi0QLFXYGtd5rKCMTsuXuupw8JFWZAv9jovOQw",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5MTUyNTA0OTMsIm5hbWUiOiJzdG9yYWdlOSJ9.oN3fqdLHnP_Km3P9bImUYhVmi75tw8A4sRXyk8VuYmU",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5MTUyNTI4MzYsIm5hbWUiOiJzdG9yYWdlMTAifQ.tEz2kORCSBDkjz0jTEF_a1_d6jq4Hyja2zpeFDCfVAg",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5NzE2MDEzMDEsIm5hbWUiOiJzdG9yYWdlMTEifQ.7w0CimGvqgIJAxyKyGz90e0NC6yF6GgoGi-6qdSnC3Y",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5NzE2MDc0NDAsIm5hbWUiOiJzdG9yYWdlMTIifQ._5B5vZvhh4mpTo9HEgmXJH7sI3Nnhh1rz1V-qDE-JS4",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5NzE2MTM1MDUsIm5hbWUiOiJzdG9yYWdlMTMifQ.OM1U5HXYoFGyA6udAgNMl_RtKz02Ujt7mF94Kw8yhZo",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5NzE2MTc5NTUsIm5hbWUiOiJzdG9yYWdlMTQifQ.Xw6zW_N2eX07lqfFQt-zCTqBm9m91oe9YtzBHfSe_SM",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5NzE4NTc1MzQsIm5hbWUiOiJzdG9yYWdlMTUifQ.kkNPjQqNmAunvE9yml5U2LaQFIL8vjG2XI_0PfF08os",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5NzE4NjE0NzYsIm5hbWUiOiJzdG9yYWdlMTYifQ.qRazJhc_5hk4_fkrXbCvq8WSZuBENX9ZBoEgsa_P_fs",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5NzE4NjczODUsIm5hbWUiOiJzdG9yYWdlMTcifQ.QlYUJvUhRCGlanqvKukx1DWKD3QGuE9E4i9EKVb5RNk",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5NzE4NzI3MTQsIm5hbWUiOiJzdG9yYWdlMTgifQ.HUkwwSUA-bj8AELKH_ZWYyq-e3BtUq4N-xS2uz9Wr9c",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5NzE4NzY1OTUsIm5hbWUiOiJzdG9yYWdlMTkifQ.Ul6R7wst2Z7-uUmXeq9TuZA0MHy-xKkpLFPpwKrQ6Fk",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5NzE4ODAwMDQsIm5hbWUiOiJzdG9yYWdlMjAifQ.ArDWuAwlGbnPlHgtm30njlyzb4xasKIEEOo3_wtf8uY",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ1ODMwMTEsIm5hbWUiOiJzdG9yYWdlMjEifQ.gMNABumOS-eRbReoOq5ihk1YPsvcLy-kgIPCggnrKd4",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ1ODY0MDIsIm5hbWUiOiJzdG9yYWdlMjIifQ.WJxl_KltM4NjwMNvt9CYumKaOoJDGrteXU-r4WK3O6A",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ1ODk2MDYsIm5hbWUiOiJzdG9yYWdlMjMifQ.Uj94qzUQqayqbEBzwapvr0vZ78fInCEv5sZhqKCrLTI",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ1OTIxMzcsIm5hbWUiOiJzdG9yYWdlMjQifQ.oTAwOxJLdVd9pKQM9JQ_zuK_r4xeQBM2yNW77SmUnnE",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ1OTQ0MjMsIm5hbWUiOiJzdG9yYWdlMjUifQ.LsTGoqttNbQm83ykZOojskgXhZxxHvxV-OcGOvC_qwg",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ1OTY4MzEsIm5hbWUiOiJzdG9yYWdlMjYifQ.h6iT72VFEtESU7zxAJAm5Y_OOzeA4T8rHLXga2J9zUo",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ2MDAwNDgsIm5hbWUiOiJzdG9yYWdlMjcifQ.srWP3lQwDaKV116Cdf6LjIO1YXS7df6S8uNATsFovuE",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ2MDIzNzgsIm5hbWUiOiJzdG9yYWdlMjgifQ.i2UxebGRri35Mr4YPWC7NlPyHKZ7WYOAmxfsbO4etBY",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ2MDQ4NTIsIm5hbWUiOiJzdG9yYWdlMjkifQ.SeqJ-SZcac5NXPXuTyoIn1aBvVA8gDaR4iCUkk9wl1k",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ2MDc1MTMsIm5hbWUiOiJzdG9yYWdlMzAifQ.eJ8QBPTF3zhCm9wI32Mvi3RpPc36ymLA8eMWbNhOcek",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ3NzYwNDgsIm5hbWUiOiJzdG9yYWdlMzEifQ.GDAbZV_MH1h_-JtExOFCBniRg1nHGlXN1G79OWwjgQY",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ3ODA1MjYsIm5hbWUiOiJzdG9yYWdlMzIifQ.3Zf_Tm3YMvAzZiPkuIwdjnDwsTv2nlV3MwF2vuhHFQk",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ3ODMwNjAsIm5hbWUiOiJzdG9yYWdlMzMifQ.82_u8PgiwY5hnz6FNByvUWQhVsDrW86OluPwbAqANEI",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ3ODc4MjEsIm5hbWUiOiJzdG9yYWdlMzQifQ.GbGOrZTJedLLprjN8NDLR-nQhjwkPVzhvAOG9V_Z0VA",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ3OTAxNjUsIm5hbWUiOiJzdG9yYWdlMzUifQ.CiyRL_EhcHyWIU4Q6qEnujSMjTZmJV-ZF84QSjiT-So",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ3OTI4MTEsIm5hbWUiOiJzdG9yYWdlMzYifQ.HFqQX0twNf0UtM8g8FUvbdffrn2HFkgDPOXEydOqMe8",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ3OTg0MjAsIm5hbWUiOiJzdG9yYWdlMzcifQ.JcAb5LSlap-QTR2haUWH6NGR6IE6MQ0D8Go1TSETr_Y",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ4MTE2NjIsIm5hbWUiOiJzdG9yYWdlMzgifQ.ugaE8RyDLgGZwwQf4W1pOMOo4uVlYMslmq-EWz82oB8",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ4MTQzNzAsIm5hbWUiOiJzdG9yYWdlMzkifQ.jwBw---F3dZ4be9wYd_fRJVXaav2FNh8p-uU5MoUYdc",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ4MTcxOTMsIm5hbWUiOiJzdG9yYWdlNDAifQ.z5-0wZjM32bV9vOKU6QLIrg6sUuMjl-vn5uEQh6390c",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ2MTIxMzgsIm5hbWUiOiJzdG9yYWdlNDEifQ.exPUEpoj6wQLV638kiY3Yo8kO4dRyvNrZWpPKD6KaAQ",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ2MTQ1NTAsIm5hbWUiOiJzdG9yYWdlNDIifQ.EX4dTIXe1FBZvkwQgvi84rx5_sNRWyhy0pI6tOczs_M",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ2MTY5MzIsIm5hbWUiOiJzdG9yYWdlNDMifQ.qSAC7WczGIQzh-TdV5C0LMEycsbg2T7DmRq6muHSjjo",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ2MTkzMTQsIm5hbWUiOiJzdG9yYWdlNDQifQ.f3UYx4a7DfCM3FVbdNh4plke88wl15lRkrqXL8tNNCE",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ2MjE4NDEsIm5hbWUiOiJzdG9yYWdlNDUifQ.R9qxUMCNFO9bdEaY1Yxv8ZDdTkmxjdM_CcrNYwq4af8",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ2MjQyNjAsIm5hbWUiOiJzdG9yYWdlNDYifQ.alnojI8MHDt9_qMKvr0opeliMKmBBvmoVOpZsbaoDFA",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ2MjY1MzksIm5hbWUiOiJzdG9yYWdlNDcifQ.78ifTclo6Y0Syd3DhmlrcHK3LG8BIYmeLriXhkPEG1o",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ2Mjg4NjMsIm5hbWUiOiJzdG9yYWdlNDgifQ.BCRo228uKGfkXEUhGIPhCwZAd7cE1y8njiJaW87uq40",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ2MzExNzIsIm5hbWUiOiJzdG9yYWdlNDkifQ.D_fsWGbEG4XcODOXkP0RPZbg9D2a4LJoiW3xAmX_dsA",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhRWIwNjg0RDVDMzAxODljMDYyOThhNUJEMkY4YmQ1ODBGMDBDRDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTI5ODQ2MzU0MTUsIm5hbWUiOiJzdG9yYWdlNTAifQ.N0nwMJuWj6raDbnuBZFPVqhdAdxJH_Z_CVhVlIhS0H0",
];


let storageClients = [];

WEB3_GET_STORAGE_KEYS.forEach((token, index) => {
  storageClients.push(new Web3Storage({ token }));
});

module.exports = async (cid) => {
  // Check if CID is provided
  if (!cid) throw new Error("CID is required");

  // Randomly select a client from the storageClients array
  const selectedClient =
    storageClients[Math.floor(Math.random() * storageClients.length)];

  // Fetch file metadata from the selected Web3 storage
  const res = await selectedClient.get(cid);
    if (!res.ok) return false;

  // Get file info
  const file = await res.files();

  // const url = `https://${file[0].cid}.ipfs.w3s.link/?filename=${file[0].name}`;
  const urls = [
    `https://${file[0].cid}.ipfs.w3s.link/?filename=${file[0].name}`,
    `https://${file[0].cid}.ipfs.dweb.link/?filename=${file[0].name}`,
    `https://ipfs.io/ipfs/${file[0].cid}`,
    `https://cloudflare-ipfs.com/ipfs/${file[0].cid}`,
    `https://${file[0].cid}.ipfs.sphn.link/${file[0].cid}`
  ];
  

  /* 
  const txtResponse = await axios.get(url_txt);
  const txtContent = txtResponse.data; */
  for (const url of urls) {
    try {
        // Fetch file content
        const response = await axios.get(url);
        const output = response.data
        // console.log(`output:${output}`);
        // output.data.cid = cid;
       

        /*     const dataToFetch = `https://${cid}.ipfs.w3s.link/data.txt`; */

        /*     try {
          const response = await axios.get(dataToFetch);
          const content = response.data;
          output.data.pagedata = content;
        } catch (error) {
          console.error("Error fetching content:", error);
        } */

        return output;
      } catch (error) {
        console.error("ERROR", error);
      }

  }

  
};

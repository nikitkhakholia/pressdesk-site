import React, { useState, useEffect } from "react";
import {
  addResource,
  getNews,
  getNewsByTopic,
  getTopics,
  uploadFile,addNews,updateNews
} from "./helper/helper";
import Base from "../Base";

export default function NewsManagement() {
  const [pageView, setPageView] = useState({
    topic: false,
    news: false,
  });
  const [topics, setTopics] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [news, setNews] = useState({
    _id: undefined,
    topic: "",
    subTopic: null,
    tags: [],
    dateOfNews: new Date().toLocaleString(),
    editor: "",
    heading: "",
    body: "",
    youtube: "",
    facebook: "",
    instagram: "",
    linkedIn: "",
    resources: [],
    files: [],
    images: [],
    videos: [],
  });

  useEffect(() => {
    loadTopics();
  }, []);
  const loadTopics = () => {
    getTopics().then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setTopics(res);
      }
    });
  };

  const loadNewsByTopic = (topicId) => {
    getNewsByTopic(topicId).then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setAllNews(res);
      }
    });
  };
  const loadNews = (newsId) => {
    getNews(newsId).then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setNews(res);
      }
    });
  };

  return (
    <Base>
      {JSON.stringify(news)}
      <div className="row container-fluid m-0 p-0 justify-content-center p-4 align-items-center">
        <div className="border p-4 rounded shadow col-9">
          <h1 className="text-center display-4">News Management</h1>
          {/* cate subcate */}
          <div className="row container-fluid m-0 p-0">
            <div className="input-group col-6 mb-4">
              <label>Topic</label>
              <div className="input-group">
                <select
                  className="custom-select"
                  onChange={(e) => {
                    setPageView({
                      ...pageView,
                      topic: e.target.value,
                      news: false,
                    });

                    setNews({
                      ...news,
                      _id: undefined,
                      topic: e.target.value,
                      subTopic: null,
                      tags: [],
                      dateOfNews: new Date(),
                      editor: "",
                      heading: "",
                      body: "",
                      youtube: "",
                      facebook: "",
                      instagram: "",
                      linkedIn: "",
                      resources: [],
                      files: [],
                      images: [],
                      videos: [],
                    });
                    setAllNews([]);
                    loadNewsByTopic(e.target.value);
                  }}
                >
                  <option disabled selected>
                    Select Topic
                  </option>

                  {topics.map((c, i) => {
                    return (
                      <option key={i} value={c._id} className="">
                        {c.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="input-group col-6 mb-4">{/* //subcategory */}</div>
          </div>
          {/* news add */}
          {pageView.topic && (
            <div className="row container-fluid m-0 p-0">
              <div className="input-group col-6 mb-4">
                <label>News</label>
                <div className="input-group">
                  <select
                    className="custom-select"
                    onChange={(e) => {
                      setPageView({
                        ...pageView,
                        news: true,
                      });
                      loadNews(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      Select News
                    </option>

                    {allNews.map((p, i) => {
                      return (
                        <option key={i} value={p._id} className="">
                          {p.heading}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              {
                <div className=" col-2 mb-4">
                  <div
                    className="input-group"
                    style={{ position: "absolute", bottom: "0" }}
                  >
                    <div
                      className="btn btn-warning"
                      onClick={() => {
                        setPageView({
                          ...pageView,
                          news: true,
                        });
                        setNews({
                          ...news,
                          _id: undefined,
                          subTopic: null,
                          tags: [],
                          dateOfNews: new Date(),
                          editor: "",
                          heading: "",
                          body: "",
                          youtube: "",
                          facebook: "",
                          instagram: "",
                          linkedIn: "",
                          resources: [],
                          files: [],
                          images: [],
                          videos: [],
                        });
                      }}
                    >
                      Add Newx
                    </div>
                  </div>
                </div>
              }
              {/* {news._id && (
                <div className="input-group col-2 mb-4">
                  <div
                    className="btn btn-warning"
                    style={{ position: "absolute", bottom: "0" }}
                    onClick={() => {
                      alert("Feature Not Added Yet");
                    }}
                  >
                    Delete
                  </div>
                </div>
              )} */}
            </div>
          )}
          {/* fields */}
          {pageView.news && (
            <div className="col">
              {/* heading */}
              <div className="input-group mb-4">
                <label>Heading</label>
                <div className="input-group">
                  <input
                    name="heading"
                    id="heading"
                    type="text"
                    className="form-control"
                    placeholder="Heading"
                    value={news.heading}
                    onChange={(e) => {
                      setNews({ ...news, heading: e.target.value });
                    }}
                  />
                </div>
              </div>
              {/* body */}
              <div className="input-group mb-4">
                <label>Body</label>
                <div className="input-group">
                  <textarea
                    name="body"
                    id="body"
                    type="text"
                    className="form-control"
                    placeholder="Body"
                    value={news.body}
                    onChange={(e) => {
                      setNews({ ...news, body: e.target.value });
                    }}
                  ></textarea>
                </div>
              </div>
              {/* Resources */}
              <div className="input-group mb-4">
                <label>Resources</label>
                <div
                  className="btn"
                  data-toggle="modal"
                  data-target="#addResModal"
                >
                  Add New
                </div>
                <div className="row mx-4 ">
                  {news.resources &&
                    news.resources.map((t, i) => {
                      return (
                        <div
                          className="row rounded border align-items-center m-1 p-1 px-2"
                          key={i}
                        >
                          <div
                            className="p"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {t.resId}
                          </div>
                          <div
                            className="btn text-center p-0 m-0"
                            onClick={() => {
                              var x = news.resources;
                              x.splice(i, 1);
                              setNews({
                                ...news,
                                resources: x,
                              });
                            }}
                          >
                            <svg
                              width="2em"
                              height="2em"
                              viewBox="0 0 16 16"
                              className="bi bi-x  h-100 w-100"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                              />
                            </svg>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="row container-fluid m-0 p-0">
                <div className="col p-0 pr-1">
                  {/* date */}
                  <div className="input-group mb-4">
                    <label>Date</label>
                    <div className="input-group">
                      <input
                        name="date"
                        id="date"
                        type="text"
                        className="form-control"
                        placeholder="Date"
                        value={news.dateOfNews}
                        onChange={(e) => {
                          setNews({ ...news, dateOfNews: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  {/* fb */}
                  <div className="input-group mb-4">
                    <label>Facebook </label>
                    <div className="input-group">
                      <input
                        name="facebook"
                        id="facebook"
                        type="text"
                        className="form-control"
                        placeholder="Facebook Link"
                        value={news.facebook}
                        onChange={(e) => {
                          setNews({ ...news, facebook: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  {/* ig */}
                  <div className="input-group mb-4">
                    <label>Instagram </label>
                    <div className="input-group">
                      <input
                        name="instagram"
                        id="isatagram"
                        type="text"
                        className="form-control"
                        placeholder="Instagram Link"
                        value={news.instagram}
                        onChange={(e) => {
                          setNews({ ...news, instagram: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  {/* tags */}
                  <div className="input-group mb-4">
                    <label>Tags</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="tag"
                        onBlur={(e) => {
                          e.preventDefault();
                          if (e.target.value.trim() === "") {
                            return;
                          }
                          var x = news.tags;
                          x.push(e.target.value);
                          setNews({ ...news, tags: x });
                          e.target.value = "";
                        }}
                      />
                    </div>
                    <div className="row mx-4 ">
                      {news.tags &&
                        news.tags.map((t, i) => {
                          return (
                            <div
                              className="row rounded border align-items-center m-1 p-1 px-2"
                              key={i}
                            >
                              <div
                                className="p"
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {t}
                              </div>
                              <div
                                className="btn text-center p-0 m-0"
                                onClick={() => {
                                  var x = news.tags;
                                  x.splice(i, 1);
                                  setNews({
                                    ...news,
                                    tags: x,
                                  });
                                }}
                              >
                                <svg
                                  width="2em"
                                  height="2em"
                                  viewBox="0 0 16 16"
                                  className="bi bi-x  h-100 w-100"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                  />
                                </svg>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="col p-0 pl-1">
                  {/* editor */}
                  <div className="input-group mb-4">
                    <label>Editor</label>
                    <div className="input-group">
                      <input
                        name="editor"
                        id="ediotor"
                        type="text"
                        className="form-control"
                        placeholder="Editor"
                        value={news.editor}
                        onChange={(e) => {
                          setNews({ ...news, editor: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  {/* yt */}
                  <div className="input-group mb-4">
                    <label>Youtube </label>
                    <div className="input-group">
                      <input
                        name="youtube"
                        id="youtube"
                        type="text"
                        className="form-control"
                        placeholder="Youtube Link"
                        value={news.youtube}
                        onChange={(e) => {
                          setNews({ ...news, youtube: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  {/* li */}
                  <div className="input-group mb-4">
                    <label>LinkedIn </label>
                    <div className="input-group">
                      <input
                        name="linkedin"
                        id="linkedin"
                        type="text"
                        className="form-control"
                        placeholder="LinkedIn Link"
                        value={news.linkedIn}
                        onChange={(e) => {
                          setNews({ ...news, linkedIn: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  {/* files */}
                  <div className="col m-0 p-0 mb-4">
                    <div className="input-group">
                      <label>Files</label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            accept="image/png,image/gif,image/jpeg"
                            id="fileInput"
                            onChange={(e) => {
                              if (!e.target.files[0]) {
                                return;
                              }
                              if (e.target.files[0].size > 2097152) {
                                alert("File size cannot be more than 2mb.");
                                return;
                              }
                              document.getElementById("fileStatus").innerText =
                                "Uploading File...";
                              document.getElementById("fileLabel").innerText =
                                e.target.files[0].name;
                              var formData = new FormData();
                              formData.set("file", e.target.files[0]);
                              formData.set("for", "News");
                              uploadFile(formData).then((res) => {
                                if (res.error) {
                                  alert(res.error);
                                } else {
                                  document.getElementById(
                                    "fileStatus"
                                  ).innerText = "File Uploaded Successfully";
                                  var x = news.files;
                                  x.push(res);
                                  setNews({ ...news, files: x });
                                }
                              });
                            }}
                          />
                          <label
                            className="custom-file-label"
                            style={{ overflow: "hidden" }}
                            id="fileLabel"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>
                      <p id="fileStatus"> </p>
                    </div>
                    <div className="col">
                      {news.files &&
                        news.files.map((img, i) => {
                          return (
                            <div
                              className="row justify-content-center border-bottom align-items-center"
                              key={i}
                            >
                              <div
                                className="p col-11"
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {img.name}
                              </div>
                              <div
                                className="btn col-1 text-center p-0 m-0 h-100 w-100"
                                onClick={() => {
                                  var x = news.files;
                                  x.splice(i, 1);
                                  setNews({
                                    ...news,
                                    files: x,
                                  });
                                }}
                              >
                                <svg
                                  width="2em"
                                  height="2em"
                                  viewBox="0 0 16 16"
                                  className="bi bi-x  h-100 w-100"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                  />
                                </svg>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="btn col-4 border"
                onClick={(e) => {
                  if (news.heading.trim() === "") {
                    alert("Please enter a heading.");
                    return;
                  }
                  if (!news._id) {
                    delete news._id;
                    addNews(news).then((res) => {
                      if (res.error) {
                        alert(res.error);
                      } else {
                        //todo
                        setNews(res);
                        alert("News added successfully");
                      }
                    });
                  } else {
                    updateNews(news).then((res) => {
                      if (res.error) {
                        alert(res.error);
                      } else {
                        setNews(res);
                        alert("News updated successfully");
                      }
                    });
                  }
                }}
              >
                {news._id ? "Update" : "Add"}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="modals">
        <div
          className="modal fade"
          id="addResModal"
          data-backdrop="static"
          data-keyboard="false"
          tabIndex="-1"
          aria-labelledby="addResourceModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addResourceModalLabel">
                  Add New Resource
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-4">
                  <input
                    id="resLink"
                    type="text"
                    className="form-control"
                    placeholder="Resource Link"
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    id="resType"
                    type="text"
                    className="form-control"
                    placeholder="Resource Type"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    var resource = {
                      link: document.getElementById("resLink").value,
                      resType: document.getElementById("resType").value.trim(),
                    };
                    if (resource.link === "") {
                      alert("Enter Valid Resource");
                      return;
                    }
                    addResource(resource).then((res) => {
                      if (res.error) {
                        alert(res.error);
                        return;
                      }
                      alert("Resource Added.");
                      document.getElementById("resLink").value = "";
                      document.getElementById("resType").value = "";
                      var reso = news.resources;
                      reso.push({ resId: res._id });
                      setNews({ ...news, resources: reso });
                    });
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}

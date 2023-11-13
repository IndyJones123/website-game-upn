"use client";

import { FaPlus } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialogue, ReturnDialogue, gameData, Prompt } from "@/interfaces";

import { Dialog } from "@/services/dialogue";
import InputText from "@/components/input-text";
import InputNumber from "@/components/input-number";
import Loading from "@/components/loading";

export default function Dialogue() {
    const query = useSearchParams();
    const name = query.get("game");
    const [data, setData] = useState<Dialogue[]>([
        {
            id: "",
            gameData: {
                Massage: [""],
                NPC: "",
                Condition: "",
                Quest: "",
                game: "",
            },
        },
    ]);
    const [promptData, setPromptData] = useState<Prompt>({
        jumlahParagraf: "1",
        topikAcuan: "",
        subTopikAcuan: [],
        condition: "",
    });
    const [tempData, setTempData] = useState<gameData[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [editIndex, setEditIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function Fetch() {
            const quest = new Dialog();

            if (name) {
                const data: Dialogue[] = await quest.getByName(name);
                setData(data);
            }
        }

        Fetch();
    }, []);

    const handleEdit = async (index: number, isEdit: boolean) => {
        setEditIndex(index);
        setIsEdit(isEdit);
    };

    const handleInput = async (e: any, idx: number) => {
        const { name, value } = e.target;

        if (name === "message") {
            const newData = [...data];
            newData[editIndex].gameData.Massage[idx] = value;
            setData(newData);
        } else if (name === "npc") {
            const newData = [...data];
            newData[editIndex].gameData.NPC = value;
            setData(newData);
        } else if (name === "condition") {
            const newData = [...data];
            newData[editIndex].gameData.Condition = value;
            setData(newData);
        } else if (name === "namaQuest") {
            const newData = [...data];
            newData[editIndex].gameData.Quest = value;
            setData(newData);
        } else if (name === "jumlahParagraf") {
            setPromptData({
                ...promptData,
                jumlahParagraf: value,
            });
        } else if (name === "topikAcuan") {
            setPromptData({ ...promptData, topikAcuan: value });
        } else if (name === "subTopikAcuan") {
            const newData = promptData.subTopikAcuan;
            newData[idx] = value;
            setPromptData({ ...promptData, subTopikAcuan: newData });
        } else if (name === "conditionPrompt") {
            setPromptData({ ...promptData, condition: value });
        }
    };

    useEffect(() => {
        setPromptData({
            ...promptData,
            subTopikAcuan: [...Array(Number(promptData.jumlahParagraf))].map(
                () => ""
            ),
        });
    }, [promptData.jumlahParagraf]);

    const handleAddMassage = async () => {
        const newData = [...data];
        newData[editIndex].gameData.Massage.push("");
        setData(newData);
    };

    const handleDeleteMassage = async (idx: number) => {
        const newData = [...data];
        newData[editIndex].gameData.Massage.splice(idx, 1);
        setData(newData);
    };

    const handleAddDialogue = async () => {
        setIsAdd(true);
    };

    const handleSendPropmt = async () => {
        setIsLoading(true);
        const dialog = new Dialog();
        const res = await dialog.generateOpenAi(promptData);
        if (res.status === true) {
            setIsLoading(false);
            const message = res.message;
            const arrayMessage = message.split("\n\n");
            const newData = [...data];
            newData.push({
                id: "",
                gameData: {
                    Massage: arrayMessage,
                    NPC: "",
                    Condition: "",
                    Quest: "",
                    game: name || "",
                },
            });
            setData(newData);
            setEditIndex(newData.length - 1);
            setIsEdit(true);
            setIsAdd(false);
        }
    };

    const handleSave = async () => {
        const dialog = new Dialog();
        // console.log(data[editIndex].gameData, data[editIndex].id);
        await dialog.update(data[editIndex].id, data[editIndex].gameData);
    };

    const handleSaveDialogue = async () => {
        const dialog = new Dialog();
        await dialog.add(data[editIndex].gameData);
    };

    const handleDelete = async (id: string) => {
        const dialog = new Dialog();
        await dialog.delete(id);
    };

    console.log(promptData);

    return (
        <div
            className={`min-h-screen w-screen flex items-center bg-[#141414] text-white relative`}
        >
            {isLoading && (
                <div className="fixed w-screen min-h-screen flex justify-center items-center z-50 backdrop-blur-md">
                    <Loading />
                </div>
            )}
            <div className="flex flex-col gap-5 p-14 pt-24 ml-32">
                <h1 className="text-4xl font-bold text-white">Dialogue Page</h1>
                <div className="">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Quest
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        NPC
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 w-[700px] text-center"
                                    >
                                        Message
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 w-[100px] text-center"
                                    >
                                        Condition
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 w-[150px text-center]"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data &&
                                    data.map((item, index) => {
                                        return (
                                            <tr
                                                className={` border-b text-center ${
                                                    index % 2 === 0
                                                        ? "bg-white dark:bg-gray-900 dark:border-gray-700"
                                                        : "bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                                                }`}
                                                key={index}
                                            >
                                                <th
                                                    scope="row"
                                                    className={`${
                                                        isEdit &&
                                                        editIndex === index
                                                            ? "hidden"
                                                            : ""
                                                    } px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`}
                                                >
                                                    {item.gameData.Quest}
                                                </th>
                                                <th
                                                    className={`${
                                                        isEdit &&
                                                        editIndex === index
                                                            ? ""
                                                            : "hidden"
                                                    } px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white `}
                                                >
                                                    <InputText
                                                        onChange={(e) =>
                                                            handleInput(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                        name="namaQuest"
                                                        width="w-[120px]"
                                                        value={
                                                            data[index].gameData
                                                                .Quest
                                                        }
                                                    />
                                                </th>
                                                <th
                                                    scope="row"
                                                    className={`${
                                                        isEdit &&
                                                        editIndex === index
                                                            ? "hidden"
                                                            : ""
                                                    } px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`}
                                                >
                                                    {item.gameData.NPC}
                                                </th>
                                                <th
                                                    className={`${
                                                        isEdit &&
                                                        editIndex === index
                                                            ? ""
                                                            : "hidden"
                                                    } px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white `}
                                                >
                                                    <InputText
                                                        onChange={(e) =>
                                                            handleInput(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                        name="npc"
                                                        width="w-[120px]"
                                                        value={
                                                            data[index].gameData
                                                                .NPC
                                                        }
                                                    />
                                                </th>
                                                <td className="px-6 py-4">
                                                    {item.gameData.Massage.map(
                                                        (message, idx) => {
                                                            return (
                                                                <div
                                                                    className="mt-3"
                                                                    key={idx}
                                                                >
                                                                    <div
                                                                        className={`flex flex-col gap-2 ${
                                                                            isEdit &&
                                                                            editIndex ===
                                                                                index
                                                                                ? "hidden"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <div className="font-medium text-gray-900 dark:text-white text-left flex gap-3">
                                                                            <h1 className="w-[10px]">
                                                                                {idx +
                                                                                    1}

                                                                                .
                                                                            </h1>
                                                                            <h1>
                                                                                {
                                                                                    message
                                                                                }
                                                                            </h1>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={`${
                                                                            isEdit &&
                                                                            editIndex ===
                                                                                index
                                                                                ? ""
                                                                                : "hidden"
                                                                        }`}
                                                                    >
                                                                        <div className="font-medium text-gray-900 dark:text-white text-left flex items-center gap-3">
                                                                            <h1 className="w-[10px]">
                                                                                {idx +
                                                                                    1}

                                                                                .
                                                                            </h1>
                                                                            <InputText
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleInput(
                                                                                        e,
                                                                                        idx
                                                                                    )
                                                                                }
                                                                                name="message"
                                                                                width="w-[550px]"
                                                                                value={
                                                                                    data[
                                                                                        index
                                                                                    ]
                                                                                        .gameData
                                                                                        .Massage[
                                                                                        idx
                                                                                    ]
                                                                                }
                                                                            />
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleDeleteMassage(
                                                                                        idx
                                                                                    )
                                                                                }
                                                                            >
                                                                                <FaDeleteLeft className="cursor-pointer w-6 h-6" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                    <button
                                                        className={`flex items-center gap-2 justify-center w-full mt-3 ${
                                                            isEdit &&
                                                            editIndex === index
                                                                ? "block"
                                                                : "hidden"
                                                        }`}
                                                        onClick={() =>
                                                            handleAddMassage()
                                                        }
                                                    >
                                                        <FaPlus className="" />
                                                        <h1>Tambah Dialogue</h1>
                                                    </button>
                                                </td>
                                                <th
                                                    scope="row"
                                                    className={`${
                                                        isEdit &&
                                                        editIndex === index
                                                            ? "hidden"
                                                            : ""
                                                    } px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`}
                                                >
                                                    {item.gameData.Condition}
                                                </th>
                                                <th
                                                    className={`${
                                                        isEdit &&
                                                        editIndex === index
                                                            ? ""
                                                            : "hidden"
                                                    } px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white `}
                                                >
                                                    <InputText
                                                        onChange={(e) =>
                                                            handleInput(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                        name="condition"
                                                        width="w-[120px]"
                                                        value={
                                                            data[index].gameData
                                                                .Condition
                                                        }
                                                    />
                                                </th>
                                                <td className="px-6 py-4 text-center flex flex-col items-center gap-2">
                                                    <button
                                                        className={`${
                                                            isEdit &&
                                                            editIndex === index
                                                                ? "hidden"
                                                                : "block"
                                                        } font-medium text-red-500 dark:text-red-500 hover:underline`}
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className={`${
                                                            isEdit &&
                                                            editIndex === index
                                                                ? "hidden"
                                                                : "block"
                                                        } font-medium text-blue-600 dark:text-blue-500 hover:underline`}
                                                        onClick={() =>
                                                            handleEdit(
                                                                index,
                                                                true
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className={`${
                                                            isEdit &&
                                                            editIndex ===
                                                                index &&
                                                            isAdd === true
                                                                ? "block"
                                                                : "hidden"
                                                        } font-medium text-red-600 dark:text-red-500 hover:underline`}
                                                        onClick={() => {
                                                            setIsEdit(false);
                                                            setIsAdd(false);
                                                            data.splice(
                                                                index,
                                                                1
                                                            );
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <div
                                                        className={`${
                                                            isAdd
                                                                ? "hidden"
                                                                : ""
                                                        }`}
                                                    >
                                                        <button
                                                            className={`${
                                                                isEdit &&
                                                                editIndex ===
                                                                    index
                                                                    ? "block"
                                                                    : "hidden"
                                                            } font-medium text-red-600 dark:text-red-500 hover:underline`}
                                                            onClick={() =>
                                                                handleEdit(
                                                                    index,
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            className={`${
                                                                isEdit &&
                                                                editIndex ===
                                                                    index &&
                                                                item.id !== ""
                                                                    ? "block"
                                                                    : "hidden"
                                                            } font-medium text-blue-600 dark:text-blue-500 hover:underline`}
                                                            onClick={() => {
                                                                handleSave();
                                                            }}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            className={`${
                                                                isEdit &&
                                                                editIndex ===
                                                                    index &&
                                                                item.id === ""
                                                                    ? "block"
                                                                    : "hidden"
                                                            } font-medium text-blue-600 dark:text-blue-500 hover:underline`}
                                                            onClick={() => {
                                                                handleSaveDialogue();
                                                            }}
                                                        >
                                                            Add Dialogue
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        <button
                            className={`border-b bg-gray-700 dark:border-gray-700 text-center w-full ${
                                isAdd ? "hidden" : ""
                            }`}
                            onClick={() => handleAddDialogue()}
                        >
                            <div className="flex items-center justify-center gap-2 px-6 py-3 font-medium text-[15px] text-gray-900 whitespace-nowrap dark:text-white">
                                <FaPlus className="w-5 h-5" />
                                Tambah Dialogue
                            </div>
                        </button>
                        <button
                            className={`border-b bg-gray-700 dark:border-gray-700 text-center w-full ${
                                isAdd ? "" : "hidden"
                            }`}
                            onClick={() => handleSaveDialogue()}
                        >
                            <div className="flex items-center justify-center gap-2 px-6 py-3 font-medium text-[15px] text-gray-900 whitespace-nowrap dark:text-white">
                                <FaPlus className="w-5 h-5" />
                                Save
                            </div>
                        </button>
                    </div>
                </div>
                <div className={`${isAdd ? "" : "hidden"}`}>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Jumlah Paragraf
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Topik Acuan
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 w-[700px] text-center"
                                    >
                                        Sub-Topik Acuan (Per-paragraf)
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 w-[100px] text-center"
                                    >
                                        Condition
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    className={`
                                        bg-white dark:bg-gray-900 dark:border-gray-700
                                    `}
                                >
                                    <th
                                        className={` px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white `}
                                    >
                                        <InputText
                                            onChange={(e) => handleInput(e, 0)}
                                            name="jumlahParagraf"
                                            width="w-[120px]"
                                            value={promptData.jumlahParagraf}
                                        />
                                    </th>
                                    <th
                                        className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white `}
                                    >
                                        <InputText
                                            onChange={(e) => handleInput(e, 0)}
                                            name="topikAcuan"
                                            width="w-[120px]"
                                            value={promptData.topikAcuan}
                                        />
                                    </th>
                                    <td className="px-6 py-4">
                                        {promptData.subTopikAcuan.map(
                                            (item, idx) => {
                                                return (
                                                    <div
                                                        className="mt-3"
                                                        key={idx}
                                                    >
                                                        <div>
                                                            <div className="font-medium text-gray-900 dark:text-white text-left flex items-center gap-3">
                                                                <h1 className="w-[10px]">
                                                                    {idx + 1}.
                                                                </h1>
                                                                <InputText
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleInput(
                                                                            e,
                                                                            idx
                                                                        )
                                                                    }
                                                                    name="subTopikAcuan"
                                                                    width="w-[550px]"
                                                                    value={
                                                                        promptData
                                                                            .subTopikAcuan[
                                                                            idx
                                                                        ]
                                                                    }
                                                                />
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteMassage(
                                                                            idx
                                                                        )
                                                                    }
                                                                >
                                                                    <FaDeleteLeft className="cursor-pointer w-6 h-6" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </td>
                                    <th
                                        className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white `}
                                    >
                                        <InputText
                                            onChange={(e) => handleInput(e, 0)}
                                            name="conditionPrompt"
                                            width="w-[120px]"
                                            value={promptData.condition}
                                        />
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            className={`border-b bg-gray-700 dark:border-gray-700 text-center w-full`}
                            onClick={() => handleSendPropmt()}
                        >
                            <div className="flex items-center justify-center gap-2 px-6 py-3 font-medium text-[15px] text-gray-900 whitespace-nowrap dark:text-white">
                                <FaPlus className="w-5 h-5" />
                                Save
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

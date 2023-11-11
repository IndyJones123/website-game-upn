"use client";

import { FaPlus } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Quests, ReturnQuest, DataQuest } from "@/interfaces";

import { Quest } from "@/services/quest/index";
import InputText from "@/components/input-text";

export default function Quests() {
    const query = useSearchParams();
    const name = query.get("game");
    const [data, setData] = useState<DataQuest[]>([
        {
            id: "",
            data: {
                NamaQuest: "",
                Goals: [""],
                Description: [""],
                game: "",
            },
        },
    ]);
    const [tempData, setTempData] = useState<Quests[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [editIndex, setEditIndex] = useState(0);

    useEffect(() => {
        async function Fetch() {
            const quest = new Quest();

            if (name) {
                const data: DataQuest[] = await quest.getByName(name);
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

        if (name === "goal") {
            const goals = [...data[editIndex].data.Goals];
            goals[idx] = value;
            const newData = [...data];
            newData[editIndex].data.Goals = goals;
            setData(newData);
        } else if (name === "description") {
            const description = [...data[editIndex].data.Description];
            description[idx] = value;
            const newData = [...data];
            newData[editIndex].data.Description = description;
            setData(newData);
        } else if (name === "namaQuest") {
            console.log(value);
            const newData = [...data];
            newData[editIndex].data.NamaQuest = value;

            setData(newData);
        }
    };

    const handleAddDescription = async () => {
        const newData = [...data];
        newData[editIndex].data.Description.push("");
        setData(newData);
    };

    const handleAddGoals = async () => {
        const newData = [...data];
        newData[editIndex].data.Goals.push("");
        setData(newData);
    };

    const handleDeleteDescription = async (idx: number) => {
        const newData = [...data];
        newData[editIndex].data.Description.splice(idx, 1);
        setData(newData);
    };

    const handleDeleteGoals = async (idx: number) => {
        const newData = [...data];
        newData[editIndex].data.Goals.splice(idx, 1);
        setData(newData);
    };

    const handleAddQuest = async () => {
        setIsAdd(true);
        const quest = new Quest();
        const newData = [...data];
        const temp = [...tempData];
        newData.push({
            id: "",
            data: {
                NamaQuest: "",
                Goals: [""],
                Description: [""],
                game: name || "",
            },
        });
        setData(newData);
        setEditIndex(newData.length - 1);
        setIsEdit(true);
        // await quest.add(newData[newData.length - 1].data);
    };

    const handleSave = async () => {
        const quest = new Quest();
        if (tempData.length > 0) {
            tempData.map(async (item) => {
                await quest.add(item);
            });

            window.location.reload();
        } else {
            await quest.update(data[editIndex].id, data[editIndex].data);
        }
    };

    const handleSaveQuest = async () => {
        const quest = new Quest();
        await quest.add(data[editIndex].data);
    };

    const handleDelete = async (id: string) => {
        const quest = new Quest();
        await quest.delete(id);
    };

    console.log(data);

    return (
        <div
            className={`h-screen w-screen flex items-center bg-[#141414] p-14 text-white relative`}
        >
            <div className="flex flex-col gap-5">
                <h1 className="text-4xl font-bold text-white">Quest Page</h1>
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
                                        className="px-6 py-3 text-center w-[300px]"
                                    >
                                        Goals
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 w-[700px] text-center"
                                    >
                                        Description
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
                                                    {item.data.NamaQuest}
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
                                                            data[index].data
                                                                .NamaQuest
                                                        }
                                                    />
                                                </th>
                                                <td className="px-6 py-4">
                                                    {item.data.Goals.map(
                                                        (goal, idx) => {
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
                                                                                    goal
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
                                                                                name="goal"
                                                                                width="w-[250px]"
                                                                                value={
                                                                                    data[
                                                                                        index
                                                                                    ]
                                                                                        .data
                                                                                        .Goals[
                                                                                        idx
                                                                                    ]
                                                                                }
                                                                            />
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleDeleteGoals(
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
                                                            handleAddGoals()
                                                        }
                                                    >
                                                        <FaPlus className="" />
                                                        <h1>Tambah Goals</h1>
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.data.Description.map(
                                                        (description, idx) => {
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
                                                                                    description
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
                                                                                name="description"
                                                                                width="w-[550px]"
                                                                                value={
                                                                                    data[
                                                                                        index
                                                                                    ]
                                                                                        .data
                                                                                        .Description[
                                                                                        idx
                                                                                    ]
                                                                                }
                                                                            />
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleDeleteDescription(
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
                                                            handleAddDescription()
                                                        }
                                                    >
                                                        <FaPlus className="" />
                                                        <h1>
                                                            Tambah Deskripsi
                                                        </h1>
                                                    </button>
                                                </td>
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
                                                            editIndex === index
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
                                                                    index
                                                                    ? "block"
                                                                    : "hidden"
                                                            } font-medium text-blue-600 dark:text-blue-500 hover:underline`}
                                                            onClick={() => {
                                                                handleSave();
                                                            }}
                                                        >
                                                            Save
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
                            onClick={() => handleAddQuest()}
                        >
                            <div className="flex items-center justify-center gap-2 px-6 py-3 font-medium text-[15px] text-gray-900 whitespace-nowrap dark:text-white">
                                <FaPlus className="w-5 h-5" />
                                Tambah Quest
                            </div>
                        </button>
                        <button
                            className={`border-b bg-gray-700 dark:border-gray-700 text-center w-full ${
                                isAdd ? "" : "hidden"
                            }`}
                            onClick={() => handleSaveQuest()}
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

import React, { useEffect, useState } from "react";
import { KTIcon } from "../../../helpers";
import { Add } from "../../../../app/modules/subjects/Add";
import { Edit } from "../../../../app/modules/subjects/Edit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
	className: string;
};

type Item = {
	id: string;
	title: string;
	description: string;
	coverImageUrl: string;
	articles: string[];
};

const SubjectsTable: React.FC<Props> = ({ className }) => {
	const [items, setItems] = useState<Item[]>([]);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
		null
	);

	const fetchSubjects = (page: number = 0) => {
		fetch(`http://167.172.165.109:8080/api/v1/subjects?page=${page}`)
			.then((response) => response.json())
			.then((data) => {
				console.log("Fetch response data:", data); // Log the response data
				setItems(data.items);
				setPage(data.page);
				setTotalPages(data.totalPages);
			})
			.catch((error) => console.error("Error fetching data:", error));
	};

	useEffect(() => {
		fetchSubjects();
	}, []);

	const handleDelete = (id: string) => {
		fetch(`http://167.172.165.109:8080/api/v1/subjects/${id}`, {
			method: "DELETE",
		})
			.then((response) => {
				if (response.ok) {
					setItems(items.filter((item) => item.id !== id));
					toast.success("Subject deleted successfully");
				} else {
					console.error("Error deleting item:", response.statusText);
					toast.error("Failed to delete subject");
				}
			})
			.catch((error) => {
				console.error("Error deleting item:", error);
				toast.error("Failed to delete subject");
			});
	};

	const handlePageChange = (newPage: number) => {
		if (newPage >= 0 && newPage < totalPages) {
			fetchSubjects(newPage);
		}
	};

	return (
		<div className={`card ${className}`}>
			<div className="card-header border-0 pt-5">
				<h3 className="card-title align-items-start flex-column">
					<span className="card-label fw-bold fs-3 mb-1">Subjects</span>
				</h3>
				<div className="card-toolbar">
					<a
						className="btn btn-sm btn-light-primary"
						data-bs-toggle="modal"
						data-bs-target="#kt_modal_add_Sub"
					>
						<KTIcon iconName="plus" className="fs-2" />
						Add New Subject
					</a>

					<Add onAddSuccess={() => fetchSubjects(page)} />
				</div>
			</div>
			<div className="card-body py-3">
				<div className="table-responsive">
					<table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
						<thead>
							<tr className="fw-bold text-muted bg-light border-none">
								<th className="ps-4 min-w-50px rounded-start">#</th>
								<th className="min-w-200px">Title</th>
								<th className="min-w-300px">Description</th>
								<th className="min-w-100px">Image</th>
								<th className="min-w-150px text-end">Actions</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item, index) => (
								<tr key={item.id}>
									<td>
										<div className="d-flex align-items-center">
											<div className="d-flex justify-content-start flex-column">
												<span className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6">
													{page * 10 + index + 1}
												</span>
											</div>
										</div>
									</td>
									<td>
										<div className="d-flex align-items-center">
											<div className="d-flex justify-content-start flex-column">
												<a
													href="#"
													className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
												>
													{item.title}
												</a>
											</div>
										</div>
									</td>
									<td>
										<span className="text-gray-900 fw-bold d-block mb-1 fs-6">
											{item.description}
										</span>
									</td>
									<td>
										<a
											href={item.coverImageUrl}
											className="btn-light-primary fw-bold d-block mb-1 fs-6"
										>
											Preview
										</a>
									</td>
									<td className="text-end">
										<a
											className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
											data-bs-toggle="modal"
											data-bs-target="#kt_modal_edit_Sub"
											onClick={() => setSelectedSubjectId(item.id)}
										>
											<KTIcon iconName="pencil" className="fs-3" />
										</a>
										<a
											href="#"
											className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
											onClick={() => handleDelete(item.id)}
										>
											<KTIcon iconName="trash" className="fs-3" />
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Edit
						subjectId={selectedSubjectId}
						onEditSuccess={() => fetchSubjects(page)}
					/>
				</div>
				<div className="d-flex justify-content-start align-items-center mt-4">
					<button
						className="btn btn-light-primary"
						disabled={page === 0}
						onClick={() => handlePageChange(page - 1)}
					>
						Previous
					</button>
					<div className="mx-5">
						{Array.from({ length: totalPages }, (_, index) => (
							<button
								key={index}
								className={`btn btn-light-primary mx-1 ${
									index === page ? "active" : ""
								}`}
								onClick={() => handlePageChange(index)}
							>
								{index + 1}
							</button>
						))}
					</div>
					<button
						className="btn btn-light-primary"
						disabled={page === totalPages - 1}
						onClick={() => handlePageChange(page + 1)}
					>
						Next
					</button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export { SubjectsTable };

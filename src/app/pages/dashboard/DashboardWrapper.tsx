import { useEffect } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { StatisticsWidget5 } from "../../../_metronic/partials/widgets";
import { Toolbar } from "../../../_metronic/layout/components/toolbar/Toolbar";
import { Content } from "../../../_metronic/layout/components/Content";

const DashboardPage = () => {
	useEffect(() => {
		// We have to show toolbar only for dashboard page
		document.getElementById("kt_layout_toolbar")?.classList.remove("d-none");
		return () => {
			document.getElementById("kt_layout_toolbar")?.classList.add("d-none");
		};
	}, []);

	return (
		<>
			<Toolbar />
			<Content>
				<PageTitle breadcrumbs={[]} description="">
					Dashboard
				</PageTitle>
				{/* begin::Row */}
				<div className="row g-5 g-xl-8">
					<div className="col-xl-4">
						<StatisticsWidget5
							className="card-xl-stretch mb-xl-8"
							svgIcon="basket"
							color="danger"
							iconColor="white"
							title="Subject"
							titleColor="white"
							description="Our Subjects"
							descriptionColor="white"
							link="/subjects"
						/>
					</div>

					<div className="col-xl-4">
						<StatisticsWidget5
							className="card-xl-stretch mb-xl-8"
							svgIcon="cheque"
							color="info"
							iconColor="white"
							title="Articles"
							titleColor="white"
							descriptionColor="white"
							description="Our Articles"
							link="/articles"
						/>
					</div>

					<div className="col-xl-4">
						<StatisticsWidget5
							className="card-xl-stretch mb-5 mb-xl-8"
							svgIcon="chart-simple-3"
							color="success"
							iconColor="white"
							titleColor="white"
							descriptionColor="white"
							title="Comming Soon"
							description="Comming Soon"
						/>
					</div>
				</div>
				{/* end::Row */}
			</Content>
		</>
	);
};

const DashboardWrapper = () => {
	const intl = useIntl();
	return (
		<>
			<PageTitle breadcrumbs={[]}>
				{intl.formatMessage({ id: "MENU.DASHBOARD" })}
			</PageTitle>
			<DashboardPage />
		</>
	);
};

export { DashboardWrapper };

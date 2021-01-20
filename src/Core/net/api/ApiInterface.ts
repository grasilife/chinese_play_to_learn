

interface flag_list_c2s {
}

interface flag_list_s2c {
	stat?: number;
	code?: number;
	msg?: string;
	data?: flagDataItem[];
}

interface flagDataItem {
	id?: string;
	name?: string;
}

interface locus_index_c2s {
	share_id?: string;
}

interface locus_index_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data: locus_index_data;
}

interface locus_index_data {
	is_old_user: number;
	has_join: number;
}

interface school_bind_c2s {
	school_name: string;
	school_id?: number;
}

interface school_bind_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: string;
}

interface school_top_c2s {
	page_size: number;
	self_school: boolean;
}

interface school_top_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: school_top_school;
}

interface school_top_school {
	school: school_top_school_data[];
}

interface school_top_school_data {
	school_id: number;
	name: string;
	user_count: number;
}

interface locus_Login_shape_c2s {
}

interface locus_Login_shape_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: user_shape_data;
}

interface locus_shape_c2s {
	user_id?: number;
}

interface locus_shape_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: user_shape_data;
}

interface user_shape_data {
	shape_items: shape_item[];
	locus_wz_id: string;
	star_tag: string;
	super_star: string;
	inspire_words: string;
	user_reffer: string;
	nickname: string;
	profile: string;
}

interface shape_item {
	wn: string;
	sl: number;
	super_star: string;
}

interface school_select_c2s {
	area_id: number;
	name?: string;
}

interface school_select_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: school_select_data[];
}

interface school_select_data {
	value: number;
	label: string;
}

interface locus_edit_c2s {
	nickname: string;
	profile: string;
}

interface locus_edit_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: string;
}

interface update_Flag_c2s {
	flag_id: string;
}

interface update_Flag_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: string;
}

interface school_user_c2s {
	page_size: number;
	school_id: number;
}

interface school_user_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: school_user_user;
}

interface school_user_user {
	user?: school_user_user_data[];
}

interface school_user_user_data {
	user_id: number;
	profile: string;
	star_id: string;
	is_login: boolean;
	nickname: string;
	user_type: number;
	flag_s_pic: string;
	flag_font_pic: string;
}

interface flag_detail_c2s {
}

interface flag_detail_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: flag_detail;
}

interface flag_detail {
	flag_s_pic: string;
	flag_b_pic_id: number;
	flag_font: string;
	flag_font_pic: string;
	nickname: string;
	banner_pic: string;
	banner_ad: string;
	user_reffer: string;
	profile: string;
}

interface message_schoolMessageList_c2s {
	school_id: number;
}

interface message_schoolMessageList_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: message_schoolMessageList_messageList;
}

interface message_schoolMessageList_messageList {
	messageList?: message_schoolMessageList_messageList_data[];
}

interface message_schoolMessageList_messageList_data {
	nick_name: string;
	headicon: string;
	message: string;
}

interface message_addSchoolMessage_c2s {
	school_id: number;
	message: string;
}

interface message_addSchoolMessage_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: message_addSchoolMessage_result;
}

interface message_addSchoolMessage_result {
	result?: boolean;
}

interface school_bindStatus_c2s {
}

interface school_bindStatus_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: school_bindStatus_data;
}

interface school_bindStatus_data {
	is_bind: boolean;
	name: string;
	school_id: number;
	user_count: number;
	rank: string;
}

interface upload_file_c2s {
	file_base_64: string;
}

interface upload_file_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: file_url;
}

interface file_url {
	url: string;
}

interface load_qrCode_c2s {
	xeswx_sourceid: string;
}

interface load_qrCode_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: qrCode_url;
}

interface qrCode_url {
	url: string;
}

interface get_school_status_c2s {
}

interface get_school_status_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: school_status;
}

interface school_status {
	is_bind: boolean;
	name: string;
	school_id: number;
	user_count: number;
	rank: string;
}

interface school_loginUser_c2s {
	page_size: number;
	school_id?: number;
}

interface school_loginUser_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: school_user_user;
}

interface school_loginTop_c2s {
	page_size: number;
	self_school: boolean;
}

interface school_loginTop_s2c {
	stat?: string;
	code?: number;
	msg?: string;
	data?: school_top_school;
}
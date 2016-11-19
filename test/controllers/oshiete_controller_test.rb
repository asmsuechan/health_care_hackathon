require 'test_helper'

class OshieteControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get oshiete_index_url
    assert_response :success
  end

end

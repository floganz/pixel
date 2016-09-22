class CampaignsController < ApplicationController
  respond_to :json
  def create
    @campaign = Campaign.new campaign_params
    @campaign.user_id = current_user.id
    if @campaign.save
      render :status => 200,
       :json => { :success => true,
                  :info => "created",
                  :campaign => @campaign
       } 
    else
      render :status => 403,
       :json => { :success => false,
                  :info => "create fail",
       }
    end
  end

  def update
    @campaign = Campaign.update params[:id], campaign_params
    if @campaign.save
      render :status => 200,
       :json => { :success => true,
                  :info => "updated",
                  :campaign => @campaign
       } 
    else
      render :status => 403,
       :json => { :success => false,
                  :info => "update fail",
       }
    end
  end

  def destroy
    @campaign = Campaign.find params[:id]
    if @campaign.destroy
      render :status => 200,
       :json => { :success => true,
                  :info => "deleted",
       } 
    else
      render :status => 403,
       :json => { :success => false,
                  :info => "delete fail",
       }
    end
  end

  def index
    @campaigns = Campaign.where(user_id: current_user.id)
      .offset(params[:offset])
      .limit(params[:limit])
    render json: Campaign.with_targets(@campaigns)
  end

  def search
    ids = []
    @campaigns = Campaign.search(params[:q], {
      offset: params[:offset],
      limit: params[:limit],
      load: false,
      where: { user_id: current_user.id },
      misspellings: {edit_distance: 10},
      minimum_should_match: 1
    })
    render json: Campaign.with_targets(@campaigns)
  end

  def show
    @campaigns = Campaign.find params[:id]
    render json: @campaigns
  end

  private
    def campaign_params
      params.require(:campaign).permit(:name)
    end
end
